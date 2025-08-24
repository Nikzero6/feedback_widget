#!/usr/bin/env node

/**
 * Database Seeding Script
 * 
 * This script populates the database with sample data for development and testing.
 * It creates sample questions and responses to demonstrate the feedback widget functionality.
 * 
 * Usage: npm run db:seed
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample questions data for seeding
const sampleQuestions = [
  {
    text: "How satisfied are you with our service?",
    type: "RATING",
    options: ["1", "2", "3", "4", "5"],
    isPublished: true,
  },
  {
    text: "Would you recommend our product to others?",
    type: "BOOLEAN",
    options: ["Yes", "No"],
    isPublished: true,
  },
  {
    text: "What features would you like to see added?",
    type: "TEXT",
    options: [],
    isPublished: true,
  },
  {
    text: "Which of our products do you use most?",
    type: "CHOICES",
    options: ["Product A", "Product B", "Product C", "Product D"],
    isPublished: true,
  },
  {
    text: "How did you hear about us?",
    type: "CHOICES",
    options: ["Social Media", "Search Engine", "Friend Recommendation", "Advertisement", "Other"],
    isPublished: true,
  },
];

// Sample responses data for seeding
const sampleResponses = [
  {
    questionId: "", // Will be set after questions are created
    answer: "4",
    metadata: {
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      timestamp: new Date().toISOString(),
    },
  },
  {
    questionId: "", // Will be set after questions are created
    answer: "Yes",
    metadata: {
      ip: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      timestamp: new Date().toISOString(),
    },
  },
  {
    questionId: "", // Will be set after questions are created
    answer: "Better mobile app experience",
    metadata: {
      ip: "192.168.1.102",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
      timestamp: new Date().toISOString(),
    },
  },
  {
    questionId: "", // Will be set after questions are created
    answer: "Product B",
    metadata: {
      ip: "192.168.1.103",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      timestamp: new Date().toISOString(),
    },
  },
  {
    questionId: "", // Will be set after questions are created
    answer: "Search Engine",
    metadata: {
      ip: "192.168.1.104",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      timestamp: new Date().toISOString(),
    },
  },
];

async function seedQuestions() {
  console.log("Creating sample questions...");
  
  // Check if questions already exist to avoid duplicates
  const existingQuestions = await prisma.question.count();
  if (existingQuestions > 0) {
    console.log(`Database already contains ${existingQuestions} questions. Skipping seeding.`);
    return [];
  }

  const questions = [];
  
  for (const questionData of sampleQuestions) {
    try {
      const question = await prisma.question.create({
        data: questionData,
      });
      questions.push(question);
      console.log(`Created question: ${question.text}`);
    } catch (error) {
      console.error(`Failed to create question: ${questionData.text}`, error);
    }
  }

  console.log(`Created ${questions.length} questions`);
  return questions;
}

async function seedResponses(questions) {
  console.log("Creating sample responses...");
  
  // Check if responses already exist to avoid duplicates
  const existingResponses = await prisma.response.count();
  if (existingResponses > 0) {
    console.log(`Database already contains ${existingResponses} responses. Skipping seeding.`);
    return [];
  }

  const responses = [];
  
  // Create responses for each question
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const responseData = sampleResponses[i];
    
    if (responseData && question) {
      try {
        const response = await prisma.response.create({
          data: {
            questionId: question.id,
            answer: responseData.answer,
            metadata: responseData.metadata,
          },
        });
        responses.push(response);
        console.log(`Created response for question: ${question.text}`);
      } catch (error) {
        console.error(`Failed to create response for question: ${question.text}`, error);
      }
    }
  }

  console.log(`Created ${responses.length} responses`);
  return responses;
}

async function displayDatabaseSummary(questions, responses) {
  console.log('\nDatabase Summary:');
  console.log(`Total Questions: ${questions.length}`);
  console.log(`Total Responses: ${responses.length}`);
  
  console.log('\nSample Questions Created:');
  questions.forEach((question, index) => {
    console.log(`${index + 1}. ${question.text} (${question.type})`);
  });
}

async function main() {
  try {
    console.log('Starting database seeding process...\n');
    
    // Seed questions first
    const questions = await seedQuestions();
    
    // Seed responses if questions were created
    let responses = [];
    if (questions.length > 0) {
      responses = await seedResponses(questions);
    }
    
    // Display summary
    await displayDatabaseSummary(questions, responses);
    
    console.log('\nDatabase seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding process
main()
  .catch((error) => {
    console.error('Unexpected error during seeding:', error);
    process.exit(1);
  });
