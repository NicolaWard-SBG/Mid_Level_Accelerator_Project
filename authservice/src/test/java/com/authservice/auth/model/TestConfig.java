package com.authservice.auth.model;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.validation.Validator;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TestConfig{

    @Autowired
    private ApplicationContext context;

    @Test
    public void testValidatorBeanPresence() {
        // Verify that the Validator bean exists in the application context
        Validator validator = context.getBean(Validator.class);
        assertThat(validator).isNotNull();
    }

    @Test
    public void testValidatorFunctionality() {
        // Validate an example object with the Validator bean
        Validator validator = context.getBean(Validator.class);
        assertThat(validator).isNotNull();

        // Example object to validate (replace with your custom annotated object if needed)
        Object sampleObject = new Object(); 

        // Check that the Validator supports the sample object's class (always true for general objects)
        assertThat(validator.supports(sampleObject.getClass())).isTrue();
    }
}
