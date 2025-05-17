Feature: Certificate Management
  As a user
  I want to manage certificates
  So that I can create and retrieve certificates

  Scenario: Create a new certificate
    Given I have a valid certificate data
      | number          | description       | date       | amount | dependency |
      | 2025.CERT.00010 | Certificado prueba| 2024-01-01 | 1000   | Empresa X  |
    When I send a POST request to "/certificate" with the certificate data
    Then the response status code should be 201
    And the response should contain a certificate with the same data
    And the certificate should have an id

  Scenario: Get a certificate by ID
    Given there is a certificate with id 10
    When I send a GET request to "/certificate/10"
    Then the response status code should be 200
    And the response should contain a certificate with id 10

  Scenario: Get all certificates
    Given there are certificates in the system
    When I send a GET request to "/certificate"
    Then the response status code should be 200
    And the response should contain a list of certificates
