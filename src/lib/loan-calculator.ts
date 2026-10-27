/**
 * DEMO LOAN CALCULATION MODULE
 * ----------------------------------------------------------------------------
 * This file contains ALL financial maths for the prototype, with no React or UI
 * code, so that approved formulas can replace it later without touching the
 * components. Keep the exported function signatures the same when you swap it.
 *
 * Demo method (illustrative only — NOT an official Bangkok Bank formula):
 *  - Interest: standard amortising loan on a reducing balance, monthly
 *    compounding, equal monthly loan payments.
 *  - Insurance: optional, priced as a yearly % of the original loan amount,
 *    spread evenly across the months. It is a separate cost and does NOT
 *    change the interest rate.
 *  - Fees: a one-time processing fee (% of principal, with min/max),
 *    shown as paid upfront and not financed.
 */

import type { FeeRule, LoanCalculationInput, LoanCalculationResult, ScheduleRow } from "@/types/finance";

/** Round to 2 decimal places (satang) to avoid floating-point noise. */
export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Equal monthly payment for an amortising loan. Handles a 0% rate. */
export function calculateMonthlyLoanPayment(principal: number, annualRatePercent: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / tenureMonths;

  const growth = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * growth) / (growth - 1);
}

export function calculateFee(principal: number, fee: FeeRule): number {
  const raw = (principal * fee.percentOfPrincipal) / 100;
  return roundCurrency(Math.min(fee.maximum, Math.max(fee.minimum, raw)));
}

export function calculateTotalInsurance(principal: number, annualPremiumPercent: number, tenureMonths: number): number {
  if (annualPremiumPercent <= 0) return 0;
  return roundCurrency(((principal * annualPremiumPercent) / 100) * (tenureMonths / 12));
}

/** Builds the month-by-month schedule. The final row absorbs rounding. */
export function buildPaymentSchedule(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  totalInsurance: number,
): ScheduleRow[] {
  const monthlyRate = annualRatePercent / 100 / 12;
  const payment = roundCurrency(calculateMonthlyLoanPayment(principal, annualRatePercent, tenureMonths));
  const monthlyInsurance = roundCurrency(totalInsurance / tenureMonths);

  const rows: ScheduleRow[] = [];
  let balance = principal;
  let insuranceCharged = 0;

  for (let period = 1; period <= tenureMonths; period++) {
    const isLast = period === tenureMonths;
    const interest = roundCurrency(balance * monthlyRate);
    const principalPart = isLast ? balance : Math.min(balance, roundCurrency(payment - interest));
    const insurance = isLast ? roundCurrency(totalInsurance - insuranceCharged) : monthlyInsurance;

    balance = roundCurrency(balance - principalPart);
    insuranceCharged = roundCurrency(insuranceCharged + insurance);

    rows.push({
      period,
      payment: roundCurrency(principalPart + interest + insurance),
      principal: roundCurrency(principalPart),
      interest,
      insurance,
      balance: Math.max(0, balance),
    });
  }

  return rows;
}

export function calculateLoan(input: LoanCalculationInput): LoanCalculationResult {
  const { principal, tenureMonths, annualRatePercent, insuranceAnnualPremiumPercent, fee } = input;

  const totalInsurance = calculateTotalInsurance(principal, insuranceAnnualPremiumPercent, tenureMonths);
  const schedule = buildPaymentSchedule(principal, annualRatePercent, tenureMonths, totalInsurance);
  const totalInterest = roundCurrency(schedule.reduce((sum, row) => sum + row.interest, 0));
  const fees = calculateFee(principal, fee);

  const monthlyLoanPayment = roundCurrency(calculateMonthlyLoanPayment(principal, annualRatePercent, tenureMonths));
  const monthlyInsurance = roundCurrency(totalInsurance / tenureMonths);

  return {
    monthlyInstallment: roundCurrency(monthlyLoanPayment + monthlyInsurance),
    monthlyLoanPayment,
    monthlyInsurance,
    principal: roundCurrency(principal),
    totalInterest,
    totalInsurance,
    fees,
    totalRepayment: roundCurrency(principal + totalInterest + totalInsurance + fees),
    schedule,
  };
}

/** Groups a monthly schedule into yearly totals (useful for long tenures). */
export function summariseScheduleByYear(schedule: ScheduleRow[]): ScheduleRow[] {
  const years: ScheduleRow[] = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const chunk = schedule.slice(i, i + 12);
    const sum = (key: "payment" | "principal" | "interest" | "insurance") =>
      roundCurrency(chunk.reduce((total, row) => total + row[key], 0));
    years.push({
      period: i / 12 + 1,
      payment: sum("payment"),
      principal: sum("principal"),
      interest: sum("interest"),
      insurance: sum("insurance"),
      balance: chunk[chunk.length - 1].balance,
    });
  }
  return years;
}
