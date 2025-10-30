// modules_export_utils.js

// Function to calculate square of a number
export const square = (x) => x * x;

// Function to calculate cube of a number
export const cube = (a) => a * a * a;

// Function to calculate factorial of a number using recursion
export const factorial = (num) => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
};