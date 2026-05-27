package com.expense.expensetracker.controller;

import com.expense.expensetracker.entity.Expense;
import com.expense.expensetracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return "Expense deleted successfully";
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense newExpense) {
        Expense oldExpense = expenseRepository.findById(id).orElseThrow();

        oldExpense.setTitle(newExpense.getTitle());
        oldExpense.setCategory(newExpense.getCategory());
        oldExpense.setAmount(newExpense.getAmount());
        oldExpense.setExpenseDate(newExpense.getExpenseDate());
        oldExpense.setPaymentMode(newExpense.getPaymentMode());

        return expenseRepository.save(oldExpense);
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {
        List<Expense> expenses = expenseRepository.findAll();

        double totalSpent = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        long totalTransactions = expenses.size();

        String topCategory = expenses.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Expense::getCategory,
                        java.util.stream.Collectors.summingDouble(Expense::getAmount)
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("None");

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalSpent", totalSpent);
        dashboard.put("totalTransactions", totalTransactions);
        dashboard.put("topCategory", topCategory);

        return dashboard;
    }
}