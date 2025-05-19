Feature: Register Management
  As a user
  I want to manage registers
  So that I can create and retrieve registers

  Scenario: Create a new register
    Given I have a valid register data
      | number          | description    | date       | amount | contractDescription | thirdParty  | certificateId |
      | 2025.REG.00020  | Registro prueba| 2024-01-05 | 500    | Contrato de prueba  | Proveedor ABC | 10          |
    When I send a POST request to "/register" with the register data
    Then the response status code should be 201
    And the response should contain a register with the same data
    And the register should have an id

  Scenario: Get a register by ID
    Given there is a register with id 20
    When I send a GET request to register endpoint "/register/20"
    Then the response status code should be 200
    And the response should contain a register with id 20

  Scenario: Get all registers
    Given there are registers in the system
    When I send a GET request to register endpoint "/register"
    Then the response status code should be 200
    And the response should contain a list of registers
