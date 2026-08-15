package com.hotel.billingreview;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ServiceController {

    // 1. Bill and Receipt Generation API
    @GetMapping("/billing/{reservationId}")
    public ResponseEntity<Map<String, Object>> getBill(@PathVariable String reservationId) {
        Map<String, Object> response = new HashMap<>();
        response.put("reservationId", reservationId);
        response.put("customerName", "Guest User");
        response.put("totalAmount", 150.00);
        response.put("status", "PAID");
        return ResponseEntity.ok(response);
    }

    // 2. Guest Review and Rating API
    @PostMapping("/reviews")
    public ResponseEntity<Map<String, String>> addReview(@RequestBody Map<String, Object> review) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Guest review and rating saved successfully");
        return ResponseEntity.status(201).body(response);
    }

    // 3. Admin Summary Dashboard API
    @GetMapping("/admin/dashboard-summary")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalRevenue", 5000.00);
        response.put("totalBookings", 42);
        response.put("averageRating", 4.8);
        return ResponseEntity.ok(response);
    }
}