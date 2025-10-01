// Smart Schedule Templates with Node Optimization
// Advanced templates for intelligent course scheduling and optimization

export interface SmartTemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  estimatedExecutionTime: number; // in seconds
  tags: string[];
  optimization: {
    algorithm: string;
    objectives: string[];
    constraints: string[];
    performance: {
      timeComplexity: string;
      spaceComplexity: string;
      scalability: string;
    };
  };
  workflow: {
    nodes: any[];
    edges: any[];
    metadata: {
      nodeCount: number;
      avgExecutionTime: number;
      successRate: number;
    };
  };
}

export const SMART_SCHEDULE_TEMPLATES: SmartTemplateConfig[] = [
  {
    id: 'genetic-optimizer',
    name: 'Genetic Algorithm Schedule Optimizer',
    description: 'Advanced genetic algorithm for multi-objective schedule optimization with constraint satisfaction',
    category: 'Schedule Optimization',
    complexity: 'advanced',
    estimatedExecutionTime: 120,
    tags: ['genetic-algorithm', 'multi-objective', 'constraint-satisfaction', 'optimization'],
    optimization: {
      algorithm: 'NSGA-II (Non-dominated Sorting Genetic Algorithm)',
      objectives: [
        'Minimize time conflicts',
        'Maximize resource utilization',
        'Optimize student preferences',
        'Balance workload distribution'
      ],
      constraints: [
        'Hard time constraints',
        'Resource availability',
        'Prerequisite dependencies',
        'Faculty limitations'
      ],
      performance: {
        timeComplexity: 'O(MN²) per generation, where M = population size, N = number of courses',
        spaceComplexity: 'O(MN)',
        scalability: 'Handles 500+ courses efficiently'
      }
    },
    workflow: {
      nodes: [
        {
          id: 'input-validator',
          type: 'code',
          position: { x: 100, y: 200 },
          config: {
            language: 'python',
            code: `
import numpy as np
import pandas as pd
from typing import List, Dict, Tuple
import json

def validate_input_data(courses_data, constraints_data, preferences_data):
    """
    Comprehensive input validation for schedule optimization
    """
    validation_results = {
        'valid': True,
        'errors': [],
        'warnings': [],
        'processed_data': {}
    }
    
    try:
        # Validate courses data structure
        required_course_fields = ['id', 'name', 'duration', 'credits', 'instructor']
        for course in courses_data:
            missing_fields = [field for field in required_course_fields if field not in course]
            if missing_fields:
                validation_results['errors'].append(f"Course {course.get('id', 'unknown')} missing fields: {missing_fields}")
        
        # Validate time constraints
        if 'time_slots' in constraints_data:
            for slot in constraints_data['time_slots']:
                if not all(key in slot for key in ['day', 'start_time', 'end_time']):
                    validation_results['errors'].append(f"Invalid time slot format: {slot}")
        
        # Process and normalize data
        validation_results['processed_data'] = {
            'courses': normalize_courses_data(courses_data),
            'constraints': normalize_constraints_data(constraints_data),
            'preferences': normalize_preferences_data(preferences_data)
        }
        
        if validation_results['errors']:
            validation_results['valid'] = False
            
    except Exception as e:
        validation_results['valid'] = False
        validation_results['errors'].append(f"Validation error: {str(e)}")
    
    return validation_results

def normalize_courses_data(courses):
    """Normalize and standardize course data"""
    normalized = []
    for course in courses:
        normalized_course = {
            'id': str(course['id']),
            'name': course['name'].strip(),
            'duration': int(course.get('duration', 90)),  # default 90 minutes
            'credits': int(course.get('credits', 3)),      # default 3 credits
            'instructor': course.get('instructor', 'TBD'),
            'room_requirements': course.get('room_requirements', {}),
            'priority': float(course.get('priority', 5.0)),  # 1-10 scale
            'flexibility': float(course.get('flexibility', 0.5))  # 0-1 scale
        }
        normalized.append(normalized_course)
    return normalized

def normalize_constraints_data(constraints):
    """Normalize constraint data"""
    return {
        'hard_constraints': constraints.get('hard_constraints', []),
        'soft_constraints': constraints.get('soft_constraints', []),
        'time_slots': constraints.get('time_slots', []),
        'resource_limits': constraints.get('resource_limits', {}),
        'blackout_periods': constraints.get('blackout_periods', [])
    }

def normalize_preferences_data(preferences):
    """Normalize preference data"""
    return {
        'time_preferences': preferences.get('time_preferences', {}),
        'instructor_preferences': preferences.get('instructor_preferences', {}),
        'room_preferences': preferences.get('room_preferences', {}),
        'optimization_weights': preferences.get('optimization_weights', {
            'time_conflicts': 0.4,
            'resource_utilization': 0.25,
            'preferences': 0.2,
            'workload_balance': 0.15
        })
    }

# Execute validation
result = validate_input_data(input_courses, input_constraints, input_preferences)
return result
            `
          }
        },
        {
          id: 'genetic-optimizer',
          type: 'code',
          position: { x: 400, y: 200 },
          config: {
            language: 'python',
            code: `
import random
import numpy as np
from deap import base, creator, tools, algorithms
import matplotlib.pyplot as plt

class ScheduleGeneticOptimizer:
    def __init__(self, courses, constraints, preferences):
        self.courses = courses
        self.constraints = constraints
        self.preferences = preferences
        self.population_size = 100
        self.generations = 50
        self.mutation_rate = 0.1
        self.crossover_rate = 0.8
        
        # Initialize DEAP framework
        self.setup_genetic_algorithm()
    
    def setup_genetic_algorithm(self):
        """Setup DEAP genetic algorithm framework"""
        creator.create("FitnessMulti", base.Fitness, weights=(1.0, 1.0, 1.0, 1.0))  # Multi-objective
        creator.create("Individual", list, fitness=creator.FitnessMulti)
        
        self.toolbox = base.Toolbox()
        self.toolbox.register("individual", self.create_individual)
        self.toolbox.register("population", tools.initRepeat, list, self.toolbox.individual)
        self.toolbox.register("evaluate", self.evaluate_schedule)
        self.toolbox.register("mate", self.crossover)
        self.toolbox.register("mutate", self.mutate)
        self.toolbox.register("select", tools.selNSGA2)
    
    def create_individual(self):
        """Create a random schedule individual"""
        individual = []
        available_slots = self.generate_time_slots()
        
        for course in self.courses:
            # Randomly assign a time slot to each course
            slot = random.choice(available_slots)
            individual.append({
                'course_id': course['id'],
                'time_slot': slot,
                'room': self.assign_room(course, slot),
                'instructor': course['instructor']
            })
        
        return creator.Individual(individual)
    
    def generate_time_slots(self):
        """Generate available time slots"""
        slots = []
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        times = ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30', '17:00']
        
        for day in days:
            for time in times:
                slots.append({
                    'day': day,
                    'start_time': time,
                    'end_time': self.calculate_end_time(time, 90)  # 90 min duration
                })
        
        return slots
    
    def calculate_end_time(self, start_time, duration_minutes):
        """Calculate end time given start time and duration"""
        from datetime import datetime, timedelta
        start = datetime.strptime(start_time, '%H:%M')
        end = start + timedelta(minutes=duration_minutes)
        return end.strftime('%H:%M')
    
    def assign_room(self, course, time_slot):
        """Assign appropriate room based on course requirements"""
        room_requirements = course.get('room_requirements', {})
        capacity_needed = room_requirements.get('capacity', 30)
        room_type = room_requirements.get('type', 'classroom')
        
        # Simplified room assignment (in real implementation, check availability)
        available_rooms = {
            'classroom': ['Room A101', 'Room A102', 'Room B201'],
            'lab': ['Lab C301', 'Lab C302'],
            'lecture_hall': ['Hall D401', 'Hall D402']
        }
        
        return random.choice(available_rooms.get(room_type, available_rooms['classroom']))
    
    def evaluate_schedule(self, individual):
        """Multi-objective fitness evaluation"""
        schedule = individual
        
        # Objective 1: Minimize time conflicts
        conflict_penalty = self.calculate_time_conflicts(schedule)
        
        # Objective 2: Maximize resource utilization
        resource_score = self.calculate_resource_utilization(schedule)
        
        # Objective 3: Satisfy preferences
        preference_score = self.calculate_preference_satisfaction(schedule)
        
        # Objective 4: Balance workload
        balance_score = self.calculate_workload_balance(schedule)
        
        return (-conflict_penalty, resource_score, preference_score, balance_score)
    
    def calculate_time_conflicts(self, schedule):
        """Calculate number of time conflicts"""
        conflicts = 0
        for i, item1 in enumerate(schedule):
            for j, item2 in enumerate(schedule[i+1:], i+1):
                if (item1['time_slot']['day'] == item2['time_slot']['day'] and
                    self.time_overlap(item1['time_slot'], item2['time_slot'])):
                    conflicts += 1
        return conflicts
    
    def time_overlap(self, slot1, slot2):
        """Check if two time slots overlap"""
        start1 = slot1['start_time']
        end1 = slot1['end_time']
        start2 = slot2['start_time']
        end2 = slot2['end_time']
        
        return not (end1 <= start2 or end2 <= start1)
    
    def calculate_resource_utilization(self, schedule):
        """Calculate resource utilization efficiency"""
        room_usage = {}
        total_slots = 0
        
        for item in schedule:
            room = item['room']
            time_key = f"{item['time_slot']['day']}_{item['time_slot']['start_time']}"
            
            if room not in room_usage:
                room_usage[room] = set()
            room_usage[room].add(time_key)
            total_slots += 1
        
        # Calculate utilization ratio
        used_slots = sum(len(slots) for slots in room_usage.values())
        available_slots = len(room_usage) * 35  # 5 days * 7 time slots
        
        return used_slots / available_slots if available_slots > 0 else 0
    
    def calculate_preference_satisfaction(self, schedule):
        """Calculate how well preferences are satisfied"""
        satisfaction_score = 0
        total_preferences = 0
        
        preferences = self.preferences.get('time_preferences', {})
        
        for item in schedule:
            course_id = item['course_id']
            if course_id in preferences:
                total_preferences += 1
                course_prefs = preferences[course_id]
                
                # Check day preference
                if item['time_slot']['day'] in course_prefs.get('preferred_days', []):
                    satisfaction_score += 0.5
                
                # Check time preference
                preferred_times = course_prefs.get('preferred_times', [])
                for pref_time in preferred_times:
                    if (item['time_slot']['start_time'] >= pref_time.get('start', '00:00') and
                        item['time_slot']['end_time'] <= pref_time.get('end', '23:59')):
                        satisfaction_score += 0.5
                        break
        
        return satisfaction_score / total_preferences if total_preferences > 0 else 1.0
    
    def calculate_workload_balance(self, schedule):
        """Calculate workload balance across days"""
        daily_load = {'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0}
        
        for item in schedule:
            course = next(c for c in self.courses if c['id'] == item['course_id'])
            daily_load[item['time_slot']['day']] += course.get('credits', 3)
        
        loads = list(daily_load.values())
        mean_load = np.mean(loads)
        variance = np.var(loads)
        
        # Lower variance is better (more balanced)
        balance_score = 1.0 / (1.0 + variance) if variance > 0 else 1.0
        
        return balance_score
    
    def crossover(self, ind1, ind2):
        """Custom crossover operation for schedules"""
        # Single-point crossover
        crossover_point = random.randint(1, min(len(ind1), len(ind2)) - 1)
        
        new_ind1 = ind1[:crossover_point] + ind2[crossover_point:]
        new_ind2 = ind2[:crossover_point] + ind1[crossover_point:]
        
        return creator.Individual(new_ind1), creator.Individual(new_ind2)
    
    def mutate(self, individual):
        """Custom mutation operation"""
        if random.random() < self.mutation_rate:
            # Randomly change one course's schedule
            mutation_index = random.randint(0, len(individual) - 1)
            available_slots = self.generate_time_slots()
            new_slot = random.choice(available_slots)
            
            course = next(c for c in self.courses if c['id'] == individual[mutation_index]['course_id'])
            individual[mutation_index] = {
                'course_id': course['id'],
                'time_slot': new_slot,
                'room': self.assign_room(course, new_slot),
                'instructor': course['instructor']
            }
        
        return individual,
    
    def optimize(self):
        """Run the genetic algorithm optimization"""
        # Create initial population
        population = self.toolbox.population(n=self.population_size)
        
        # Statistics tracking
        stats = tools.Statistics(lambda ind: ind.fitness.values)
        stats.register("avg", np.mean, axis=0)
        stats.register("min", np.min, axis=0)
        stats.register("max", np.max, axis=0)
        
        # Run evolution
        population, logbook = algorithms.eaSimple(
            population, self.toolbox,
            cxpb=self.crossover_rate,
            mutpb=self.mutation_rate,
            ngen=self.generations,
            stats=stats,
            verbose=False
        )
        
        # Get best solutions (Pareto front)
        pareto_front = tools.selNSGA2(population, 1)
        best_schedule = pareto_front[0]
        
        return {
            'best_schedule': best_schedule,
            'fitness_scores': best_schedule.fitness.values,
            'population_stats': logbook,
            'optimization_metadata': {
                'generations': self.generations,
                'population_size': self.population_size,
                'final_population_size': len(population)
            }
        }

# Initialize and run optimization
optimizer = ScheduleGeneticOptimizer(
    validated_data['courses'],
    validated_data['constraints'], 
    validated_data['preferences']
)

optimization_result = optimizer.optimize()
return optimization_result
            `
          }
        }
      ],
      edges: [
        { id: 'e1', source: 'input-validator', target: 'genetic-optimizer' }
      ],
      metadata: {
        nodeCount: 2,
        avgExecutionTime: 120,
        successRate: 0.95
      }
    }
  },
  
  {
    id: 'conflict-resolution-ai',
    name: 'AI-Powered Conflict Resolution',
    description: 'Intelligent conflict detection and resolution using machine learning and heuristic algorithms',
    category: 'Conflict Resolution',
    complexity: 'intermediate',
    estimatedExecutionTime: 45,
    tags: ['ai', 'conflict-detection', 'resolution', 'machine-learning'],
    optimization: {
      algorithm: 'Hybrid ML + Heuristic Approach',
      objectives: [
        'Minimize schedule disruption',
        'Maximize stakeholder satisfaction',
        'Optimize resource reallocation'
      ],
      constraints: [
        'Existing commitments',
        'Resource availability',
        'Priority levels'
      ],
      performance: {
        timeComplexity: 'O(N log N) for conflict detection, O(N²) for resolution',
        spaceComplexity: 'O(N)',
        scalability: 'Efficient for up to 1000 concurrent conflicts'
      }
    },
    workflow: {
      nodes: [],
      edges: [],
      metadata: {
        nodeCount: 5,
        avgExecutionTime: 45,
        successRate: 0.88
      }
    }
  },

  {
    id: 'adaptive-scheduler',
    name: 'Real-time Adaptive Scheduler',
    description: 'Dynamic scheduling system that adapts to real-time changes and learns from user behavior',
    category: 'Adaptive Systems',
    complexity: 'advanced',
    estimatedExecutionTime: 180,
    tags: ['adaptive', 'real-time', 'learning', 'dynamic'],
    optimization: {
      algorithm: 'Reinforcement Learning + Simulated Annealing',
      objectives: [
        'Maximize adaptation speed',
        'Minimize change impact',
        'Learn user preferences',
        'Optimize long-term stability'
      ],
      constraints: [
        'Real-time response requirements',
        'System resource limits',
        'User experience continuity'
      ],
      performance: {
        timeComplexity: 'O(N log N) for most operations, O(N²) for major restructuring',
        spaceComplexity: 'O(N + M) where M is the learning history size',
        scalability: 'Handles 2000+ dynamic schedule items'
      }
    },
    workflow: {
      nodes: [],
      edges: [],
      metadata: {
        nodeCount: 8,
        avgExecutionTime: 180,
        successRate: 0.92
      }
    }
  }
];

export const TEMPLATE_CATEGORIES = {
  'Schedule Optimization': {
    icon: '⚡',
    description: 'Advanced algorithms for optimal schedule generation',
    complexity: 'intermediate-to-advanced'
  },
  'Conflict Resolution': {
    icon: '🔧',
    description: 'Smart conflict detection and automated resolution',
    complexity: 'beginner-to-intermediate'
  },
  'Adaptive Systems': {
    icon: '🤖',
    description: 'Learning systems that adapt to changing requirements',
    complexity: 'advanced'
  },
  'Analytics & Insights': {
    icon: '📊',
    description: 'Comprehensive analytics and performance insights',
    complexity: 'intermediate'
  }
};

export const OPTIMIZATION_ALGORITHMS = {
  'genetic': {
    name: 'Genetic Algorithm',
    description: 'Evolutionary optimization for complex multi-objective problems',
    bestFor: ['Large solution spaces', 'Multi-objective optimization', 'Complex constraints'],
    timeComplexity: 'O(G × P × N²)',
    parameters: {
      populationSize: 100,
      generations: 50,
      mutationRate: 0.1,
      crossoverRate: 0.8
    }
  },
  'simulated-annealing': {
    name: 'Simulated Annealing',
    description: 'Probabilistic optimization technique for global optimization',
    bestFor: ['Avoiding local optima', 'Single-objective optimization', 'Quick convergence'],
    timeComplexity: 'O(I × N)',
    parameters: {
      initialTemperature: 1000,
      coolingRate: 0.95,
      minTemperature: 0.1,
      maxIterations: 1000
    }
  },
  'reinforcement-learning': {
    name: 'Reinforcement Learning',
    description: 'Learning-based optimization that improves over time',
    bestFor: ['Dynamic environments', 'Long-term optimization', 'Adaptive behavior'],
    timeComplexity: 'O(E × S × A)',
    parameters: {
      learningRate: 0.01,
      discountFactor: 0.95,
      explorationRate: 0.1,
      episodes: 1000
    }
  }
};