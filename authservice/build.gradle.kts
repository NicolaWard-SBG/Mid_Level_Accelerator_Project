plugins {
    java
    id("org.springframework.boot") version "2.7.16"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    id("jacoco") // Add JaCoCo plugin
    id("org.jlleitschuh.gradle.ktlint") version "11.3.2"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_1_8 // Updated to Java 17
    targetCompatibility = JavaVersion.VERSION_1_8
}

repositories {
    mavenCentral()
    maven { url = uri("https://oss.sonatype.org/content/repositories/snapshots/") } // Add snapshot repository
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-mongodb")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("jakarta.validation:jakarta.validation-api:2.0.2")
    implementation("org.hibernate.validator:hibernate-validator:6.2.1.Final")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    implementation("io.micrometer:micrometer-registry-prometheus")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// JaCoCo configuration
jacoco {
    toolVersion = "0.8.13-SNAPSHOT" // Use the latest snapshot version
}

tasks.jacocoTestReport {
    dependsOn(tasks.test) // Run tests before generating the report

    reports {
        xml.required.set(true)
        csv.required.set(false)
        html.outputLocation.set(file("$buildDir/reports/jacoco/html"))
    }
    classDirectories.setFrom(
        fileTree("$buildDir/classes/java/main").apply {
            exclude("**/sun/**", "**/com/sun/**", "**/java/**", "**/javax/**", "**/jdk/**")
        }
    )
}

tasks.jacocoTestCoverageVerification {
    dependsOn(tasks.jacocoTestReport) // Ensure the report is generated before verification

    violationRules {
        rule {
            element = "CLASS"

            limit {
                counter = "LINE"
                value = "COVEREDRATIO"
                minimum = BigDecimal("0.50") // Set minimum coverage to 80%
            }

            limit {
                counter = "BRANCH"
                value = "COVEREDRATIO"
                minimum = BigDecimal("0.50") // Set minimum branch coverage to 70%
            }
        }
    }
}

// Ensure coverage verification is part of the build lifecycle
tasks.check {
    dependsOn(tasks.jacocoTestCoverageVerification)
}
