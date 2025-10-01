import React, { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { NodeType, NodeCategory } from '../types';
import { 
  Search, 
  Star, 
  Download, 
  Eye, 
  Filter,
  Zap,
  Bot,
  Globe,
  Database,
  Clock,
  Mail,
  Brain,
  Target,
  TrendingUp,
  Settings,
  MessageSquare,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  featured: boolean;
  downloads: number;
  rating: number;
  preview: string;
  workflow: {
    nodes: Array<{
      id: string;
      type: string;
      position: { x: number; y: number };
      data?: any;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
  };
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Smart Course Optimizer',
    description: 'AI-powered course scheduling with conflict detection and optimization',
    category: 'AI Helper',
    tags: ['scheduling', 'optimization', 'ai'],
    icon: <Bot className="w-6 h-6" />,
    featured: true,
    downloads: 2150,
    rating: 4.9,
    preview: 'Intelligent course scheduling that automatically resolves conflicts and optimizes timetables',
    workflow: {
      nodes: [
        { id: 'start-1', type: 'start', position: { x: 100, y: 200 } },
        { id: 'file-1', type: 'fileUpload', position: { x: 280, y: 120 }, data: { config: { acceptedFormats: ['.csv', '.json'], description: 'Upload course data' } } },
        { id: 'llm-1', type: 'llm', position: { x: 460, y: 200 }, data: { config: { prompt: 'Analyze course requirements and constraints from {{course_data}}. Identify potential scheduling conflicts and suggest optimal time slots based on priority, dependencies, and resource availability.' } } },
        { id: 'code-1', type: 'code', position: { x: 640, y: 120 }, data: { config: { code: 'import numpy as np\nfrom datetime import datetime, timedelta\n\ndef optimize_schedule(courses, constraints):\n    # Genetic algorithm for course optimization\n    population_size = 100\n    generations = 50\n    \n    # Initialize population\n    population = generate_initial_population(courses, population_size)\n    \n    for generation in range(generations):\n        # Evaluate fitness\n        fitness_scores = [evaluate_fitness(individual, constraints) for individual in population]\n        \n        # Selection and crossover\n        population = genetic_operations(population, fitness_scores)\n    \n    return get_best_schedule(population, fitness_scores)\n\nresult = optimize_schedule(input_courses, scheduling_constraints)\nreturn result' } } },
        { id: 'ifelse-1', type: 'ifElse', position: { x: 640, y: 280 }, data: { config: { condition: 'conflicts_count > 0', trueLabel: 'Resolve Conflicts', falseLabel: 'Generate Output' } } },
        { id: 'template-1', type: 'template', position: { x: 820, y: 200 }, data: { config: { template: '# Optimized Course Schedule\n\n## Schedule Overview\n- Total Courses: {{total_courses}}\n- Conflicts Resolved: {{resolved_conflicts}}\n- Optimization Score: {{optimization_score}}\n\n## Weekly Schedule\n{{#each schedule_by_day}}\n### {{day}}\n{{#each courses}}\n- **{{course_name}}** ({{course_code}})\n  - Time: {{start_time}} - {{end_time}}\n  - Room: {{room}}\n  - Credits: {{credits}}\n{{/each}}\n{{/each}}' } } },
        { id: 'end-1', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e1-2', source: 'start-1', target: 'file-1' },
        { id: 'e1-3', source: 'start-1', target: 'llm-1' },
        { id: 'e2-3', source: 'file-1', target: 'llm-1' },
        { id: 'e3-4', source: 'llm-1', target: 'code-1' },
        { id: 'e3-5', source: 'llm-1', target: 'ifelse-1' },
        { id: 'e4-6', source: 'code-1', target: 'template-1' },
        { id: 'e5-6', source: 'ifelse-1', target: 'template-1' },
        { id: 'e6-7', source: 'template-1', target: 'end-1' }
      ]
    }
  },
  {
    id: '2',
    name: 'Neural Network Schedule Predictor',
    description: 'Deep learning model that predicts optimal schedule patterns and student preferences',
    category: 'AI Helper',
    tags: ['neural-network', 'prediction', 'deep-learning', 'patterns'],
    icon: <Brain className="w-6 h-6" />,
    featured: true,
    downloads: 1732,
    rating: 4.8,
    preview: 'Advanced neural network that learns from historical data to predict and optimize future schedules',
    workflow: {
      nodes: [
        { id: 'start-2', type: 'start', position: { x: 100, y: 200 } },
        { id: 'db-2', type: 'database', position: { x: 280, y: 120 }, data: { config: { query: 'SELECT * FROM historical_schedules JOIN student_feedback ON schedules.id = feedback.schedule_id ORDER BY semester DESC LIMIT 5000', description: 'Load training data' } } },
        { id: 'code-2', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'import tensorflow as tf\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import train_test_split\n\nclass ScheduleNeuralNetwork:\n    def __init__(self):\n        self.model = None\n        self.scaler = StandardScaler()\n        self.feature_columns = [\n            "time_slot_efficiency", "room_utilization", "instructor_rating",\n            "student_satisfaction", "conflict_frequency", "workload_balance"\n        ]\n    \n    def prepare_data(self, historical_data):\n        """Prepare and normalize training data"""\n        # Extract features\n        X = self.extract_features(historical_data)\n        y = self.extract_targets(historical_data)\n        \n        # Normalize features\n        X_scaled = self.scaler.fit_transform(X)\n        \n        # Split data\n        X_train, X_test, y_train, y_test = train_test_split(\n            X_scaled, y, test_size=0.2, random_state=42\n        )\n        \n        return X_train, X_test, y_train, y_test\n    \n    def build_model(self, input_dim):\n        """Build neural network architecture"""\n        model = tf.keras.Sequential([\n            tf.keras.layers.Dense(128, activation="relu", input_shape=(input_dim,)),\n            tf.keras.layers.Dropout(0.3),\n            tf.keras.layers.Dense(64, activation="relu"),\n            tf.keras.layers.Dropout(0.2),\n            tf.keras.layers.Dense(32, activation="relu"),\n            tf.keras.layers.Dense(16, activation="relu"),\n            tf.keras.layers.Dense(1, activation="sigmoid")  # Schedule quality score\n        ])\n        \n        model.compile(\n            optimizer="adam",\n            loss="binary_crossentropy",\n            metrics=["accuracy", "precision", "recall"]\n        )\n        \n        return model\n    \n    def train_model(self, X_train, y_train, X_test, y_test):\n        """Train the neural network"""\n        self.model = self.build_model(X_train.shape[1])\n        \n        # Callbacks\n        early_stopping = tf.keras.callbacks.EarlyStopping(\n            monitor="val_loss", patience=10, restore_best_weights=True\n        )\n        \n        reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(\n            monitor="val_loss", factor=0.2, patience=5, min_lr=0.0001\n        )\n        \n        # Train model\n        history = self.model.fit(\n            X_train, y_train,\n            validation_data=(X_test, y_test),\n            epochs=100,\n            batch_size=32,\n            callbacks=[early_stopping, reduce_lr],\n            verbose=0\n        )\n        \n        return history\n    \n    def predict_schedule_quality(self, schedule_features):\n        """Predict quality score for a given schedule"""\n        if self.model is None:\n            raise ValueError("Model not trained yet")\n        \n        features_scaled = self.scaler.transform([schedule_features])\n        prediction = self.model.predict(features_scaled, verbose=0)\n        \n        return float(prediction[0][0])\n    \n    def extract_features(self, data):\n        """Extract relevant features from historical data"""\n        features = []\n        for record in data:\n            feature_vector = [\n                record.get("time_slot_efficiency", 0.5),\n                record.get("room_utilization", 0.7),\n                record.get("instructor_rating", 4.0) / 5.0,  # Normalize to 0-1\n                record.get("student_satisfaction", 3.5) / 5.0,\n                1.0 - min(record.get("conflict_frequency", 0.1), 1.0),\n                record.get("workload_balance", 0.6)\n            ]\n            features.append(feature_vector)\n        return np.array(features)\n    \n    def extract_targets(self, data):\n        """Extract target values (success indicators)"""\n        targets = []\n        for record in data:\n            # Composite success score\n            success_score = (\n                record.get("student_satisfaction", 3.5) / 5.0 * 0.4 +\n                record.get("instructor_satisfaction", 4.0) / 5.0 * 0.3 +\n                (1.0 - min(record.get("conflict_frequency", 0.1), 1.0)) * 0.3\n            )\n            targets.append(1 if success_score > 0.7 else 0)  # Binary classification\n        return np.array(targets)\n\n# Initialize and train neural network\nnn = ScheduleNeuralNetwork()\nX_train, X_test, y_train, y_test = nn.prepare_data(historical_schedules)\ntraining_history = nn.train_model(X_train, y_train, X_test, y_test)\n\n# Evaluate model performance\ntest_loss, test_accuracy, test_precision, test_recall = nn.model.evaluate(X_test, y_test, verbose=0)\nf1_score = 2 * (test_precision * test_recall) / (test_precision + test_recall)\n\nresult = {\n    "model_trained": True,\n    "performance_metrics": {\n        "accuracy": float(test_accuracy),\n        "precision": float(test_precision),\n        "recall": float(test_recall),\n        "f1_score": float(f1_score),\n        "test_loss": float(test_loss)\n    },\n    "training_history": {\n        "epochs": len(training_history.history["loss"]),\n        "final_loss": float(training_history.history["loss"][-1]),\n        "final_val_loss": float(training_history.history["val_loss"][-1])\n    },\n    "model_ready": True\n}\n\nreturn result' } } },
        { id: 'llm-2', type: 'llm', position: { x: 640, y: 120 }, data: { config: { prompt: 'Analyze the neural network training results:\n\nModel Performance: {{performance_metrics}}\nTraining History: {{training_history}}\n\nGenerate insights about:\n1. Model reliability and confidence levels\n2. Key patterns identified in successful schedules\n3. Recommendations for schedule optimization\n4. Areas where the model shows strong/weak performance\n5. Actionable insights for administrators\n\nProvide specific recommendations based on the learned patterns.' } } },
        { id: 'code-predict', type: 'code', position: { x: 640, y: 280 }, data: { config: { code: 'def generate_optimized_schedule_with_nn(courses, constraints, nn_model):\n    """Generate schedule using neural network predictions"""\n    candidate_schedules = []\n    \n    # Generate multiple candidate schedules\n    for attempt in range(50):\n        candidate = generate_random_schedule(courses, constraints)\n        \n        # Extract features for NN prediction\n        features = extract_schedule_features(candidate)\n        \n        # Predict quality using trained model\n        predicted_quality = nn_model.predict_schedule_quality(features)\n        \n        candidate_schedules.append({\n            "schedule": candidate,\n            "predicted_quality": predicted_quality,\n            "features": features\n        })\n    \n    # Sort by predicted quality and select best ones\n    candidate_schedules.sort(key=lambda x: x["predicted_quality"], reverse=True)\n    \n    # Select top candidates for further optimization\n    top_candidates = candidate_schedules[:10]\n    \n    # Apply local search optimization on top candidates\n    optimized_schedule = apply_local_search_optimization(\n        top_candidates[0]["schedule"], \n        constraints,\n        nn_model\n    )\n    \n    return {\n        "optimized_schedule": optimized_schedule,\n        "predicted_quality": top_candidates[0]["predicted_quality"],\n        "alternatives": top_candidates[1:5],  # Top 5 alternatives\n        "optimization_confidence": calculate_confidence(top_candidates)\n    }\n\n# Generate optimized schedule using trained NN\noptimized_result = generate_optimized_schedule_with_nn(\n    input_courses, \n    input_constraints, \n    nn\n)\n\nreturn optimized_result' } } },
        { id: 'template-2', type: 'template', position: { x: 820, y: 200 }, data: { config: { template: '# Neural Network Schedule Analysis\n\n## Model Performance\n- **Accuracy**: {{performance_metrics.accuracy}}%\n- **Precision**: {{performance_metrics.precision}}%\n- **Recall**: {{performance_metrics.recall}}%\n- **F1 Score**: {{performance_metrics.f1_score}}%\n\n## Generated Schedule\n**Predicted Quality Score**: {{predicted_quality}}/1.0\n**Optimization Confidence**: {{optimization_confidence}}%\n\n### Weekly Schedule\n{{#each optimized_schedule}}\n#### {{day}}\n{{#each time_slots}}\n- **{{course_name}}** ({{course_code}})\n  - Time: {{start_time}} - {{end_time}}\n  - Room: {{room}}\n  - Quality Score: {{quality_score}}\n{{/each}}\n{{/each}}\n\n## Alternative Schedules\n{{#each alternatives}}\n### Option {{@index}}\n- **Quality Score**: {{predicted_quality}}\n- **Key Features**: {{key_differences}}\n{{/each}}\n\n## AI Insights\n{{ai_insights}}' } } },
        { id: 'end-2', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e2-1', source: 'start-2', target: 'db-2' },
        { id: 'e2-2', source: 'db-2', target: 'code-2' },
        { id: 'e2-3', source: 'code-2', target: 'llm-2' },
        { id: 'e2-4', source: 'code-2', target: 'code-predict' },
        { id: 'e2-5', source: 'llm-2', target: 'template-2' },
        { id: 'e2-6', source: 'code-predict', target: 'template-2' },
        { id: 'e2-7', source: 'template-2', target: 'end-2' }
      ]
    }
  },
  {
    id: '3',
    name: 'Multi-Objective Schedule Optimizer',
    description: 'Advanced Pareto-optimal scheduling considering multiple conflicting objectives',
    category: 'Schedule Optimization',
    tags: ['multi-objective', 'pareto-optimal', 'constraints', 'optimization'],
    icon: <Target className="w-6 h-6" />,
    featured: true,
    downloads: 1456,
    rating: 4.7,
    preview: 'Sophisticated optimization balancing student satisfaction, resource efficiency, and academic quality',
    workflow: {
      nodes: [
        { id: 'start-3', type: 'start', position: { x: 100, y: 200 } },
        { id: 'file-3', type: 'fileUpload', position: { x: 280, y: 120 }, data: { config: { acceptedFormats: ['.json', '.yaml'], description: 'Upload objectives and weights configuration' } } },
        { id: 'db-3', type: 'database', position: { x: 280, y: 280 }, data: { config: { query: 'SELECT * FROM courses c JOIN requirements r ON c.id = r.course_id JOIN resources res ON c.id = res.course_id', description: 'Load comprehensive course data' } } },
        { id: 'code-3', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'import numpy as np\nfrom pymoo.algorithms.moo.nsga2 import NSGA2\nfrom pymoo.core.problem import Problem\nfrom pymoo.optimize import minimize\nfrom pymoo.operators.crossover.sbx import SBX\nfrom pymoo.operators.mutation.pm import PM\nfrom pymoo.operators.sampling.rnd import IntegerRandomSampling\n\nclass MultiObjectiveScheduleProblem(Problem):\n    def __init__(self, courses, constraints, preferences):\n        self.courses = courses\n        self.constraints = constraints\n        self.preferences = preferences\n        \n        # Problem definition\n        n_vars = len(courses)  # Each course needs a time slot assignment\n        n_obj = 4  # Number of objectives\n        n_constr = self.calculate_constraints_count()\n        \n        super().__init__(n_var=n_vars, n_obj=n_obj, n_constr=n_constr,\n                         xl=0, xu=self.get_max_time_slots()-1, type_var=int)\n    \n    def calculate_constraints_count(self):\n        """Calculate total number of constraints"""\n        # Hard constraints: no time conflicts, resource availability, prerequisites\n        hard_constraints = len(self.courses) * (len(self.courses) - 1) // 2  # Pairwise conflicts\n        resource_constraints = len(set(course.get("resource_type") for course in self.courses))\n        prerequisite_constraints = sum(len(course.get("prerequisites", [])) for course in self.courses)\n        \n        return hard_constraints + resource_constraints + prerequisite_constraints\n    \n    def get_max_time_slots(self):\n        """Get maximum number of available time slots"""\n        return 35  # 5 days × 7 time slots per day\n    \n    def _evaluate(self, X, out, *args, **kwargs):\n        """Evaluate multiple objectives for each solution"""\n        objectives = []\n        constraints_violations = []\n        \n        for solution in X:\n            # Objective 1: Minimize time conflicts (to be minimized)\n            conflict_score = self.calculate_time_conflicts(solution)\n            \n            # Objective 2: Maximize resource utilization (negative for minimization)\n            resource_score = -self.calculate_resource_utilization(solution)\n            \n            # Objective 3: Maximize student satisfaction (negative for minimization)\n            satisfaction_score = -self.calculate_student_satisfaction(solution)\n            \n            # Objective 4: Minimize instructor workload imbalance\n            workload_balance = self.calculate_workload_imbalance(solution)\n            \n            objectives.append([conflict_score, resource_score, satisfaction_score, workload_balance])\n            \n            # Calculate constraint violations\n            violations = self.calculate_constraint_violations(solution)\n            constraints_violations.append(violations)\n        \n        out["F"] = np.array(objectives)\n        out["G"] = np.array(constraints_violations)\n    \n    def calculate_time_conflicts(self, solution):\n        """Calculate number of time conflicts"""\n        conflicts = 0\n        time_slot_assignments = {}\n        \n        for course_idx, time_slot in enumerate(solution):\n            day = time_slot // 7\n            hour = time_slot % 7\n            \n            time_key = (day, hour)\n            if time_key in time_slot_assignments:\n                conflicts += 1\n            else:\n                time_slot_assignments[time_key] = course_idx\n        \n        return conflicts\n    \n    def calculate_resource_utilization(self, solution):\n        """Calculate overall resource utilization efficiency"""\n        resource_usage = {}\n        total_capacity = 0\n        used_capacity = 0\n        \n        for course_idx, time_slot in enumerate(solution):\n            course = self.courses[course_idx]\n            resource_type = course.get("resource_type", "classroom")\n            capacity_needed = course.get("capacity", 30)\n            \n            time_key = (time_slot // 7, time_slot % 7)  # (day, hour)\n            \n            if resource_type not in resource_usage:\n                resource_usage[resource_type] = {}\n            \n            if time_key not in resource_usage[resource_type]:\n                resource_usage[resource_type][time_key] = 0\n            \n            resource_usage[resource_type][time_key] += capacity_needed\n            total_capacity += 100  # Assume 100 capacity per resource per time slot\n            used_capacity += capacity_needed\n        \n        return used_capacity / total_capacity if total_capacity > 0 else 0\n    \n    def calculate_student_satisfaction(self, solution):\n        """Calculate student satisfaction based on preferences"""\n        total_satisfaction = 0\n        total_preferences = 0\n        \n        student_prefs = self.preferences.get("student_preferences", {})\n        \n        for course_idx, time_slot in enumerate(solution):\n            course_id = self.courses[course_idx]["id"]\n            day = time_slot // 7\n            hour = time_slot % 7\n            \n            if course_id in student_prefs:\n                total_preferences += 1\n                prefs = student_prefs[course_id]\n                \n                # Check day preference\n                preferred_days = prefs.get("preferred_days", [])\n                if day in preferred_days:\n                    total_satisfaction += 0.5\n                \n                # Check time preference\n                preferred_hours = prefs.get("preferred_hours", [])\n                if hour in preferred_hours:\n                    total_satisfaction += 0.5\n        \n        return total_satisfaction / total_preferences if total_preferences > 0 else 0.5\n    \n    def calculate_workload_imbalance(self, solution):\n        """Calculate instructor workload imbalance"""\n        instructor_loads = {}\n        \n        for course_idx, time_slot in enumerate(solution):\n            course = self.courses[course_idx]\n            instructor = course.get("instructor", "TBD")\n            credits = course.get("credits", 3)\n            \n            if instructor not in instructor_loads:\n                instructor_loads[instructor] = 0\n            instructor_loads[instructor] += credits\n        \n        if len(instructor_loads) <= 1:\n            return 0\n        \n        loads = list(instructor_loads.values())\n        mean_load = np.mean(loads)\n        variance = np.var(loads)\n        \n        return variance / (mean_load + 1)  # Normalize by mean load\n    \n    def calculate_constraint_violations(self, solution):\n        """Calculate all constraint violations"""\n        violations = []\n        \n        # Time conflict violations\n        conflicts = self.calculate_time_conflicts(solution)\n        violations.append(max(0, conflicts))  # Should be 0\n        \n        # Resource capacity violations\n        resource_violations = self.check_resource_capacity_violations(solution)\n        violations.extend(resource_violations)\n        \n        # Prerequisite violations\n        prereq_violations = self.check_prerequisite_violations(solution)\n        violations.extend(prereq_violations)\n        \n        return violations\n    \n    def check_resource_capacity_violations(self, solution):\n        """Check if resource capacities are exceeded"""\n        violations = []\n        resource_usage = {}\n        \n        for course_idx, time_slot in enumerate(solution):\n            course = self.courses[course_idx]\n            resource_type = course.get("resource_type", "classroom")\n            capacity_needed = course.get("capacity", 30)\n            \n            time_key = (time_slot // 7, time_slot % 7, resource_type)\n            \n            if time_key not in resource_usage:\n                resource_usage[time_key] = 0\n            resource_usage[time_key] += capacity_needed\n        \n        # Check against available capacity (assume 100 per resource type per time slot)\n        for time_key, used_capacity in resource_usage.items():\n            available_capacity = 100\n            violation = max(0, used_capacity - available_capacity)\n            violations.append(violation)\n        \n        return violations\n    \n    def check_prerequisite_violations(self, solution):\n        """Check prerequisite course scheduling violations"""\n        violations = []\n        \n        course_schedule = {}\n        for course_idx, time_slot in enumerate(solution):\n            course_id = self.courses[course_idx]["id"]\n            course_schedule[course_id] = time_slot\n        \n        for course_idx, time_slot in enumerate(solution):\n            course = self.courses[course_idx]\n            prerequisites = course.get("prerequisites", [])\n            \n            for prereq_id in prerequisites:\n                if prereq_id in course_schedule:\n                    prereq_time = course_schedule[prereq_id]\n                    # Prerequisite should be scheduled before (earlier time slot)\n                    violation = max(0, prereq_time - time_slot + 1)\n                    violations.append(violation)\n        \n        return violations\n\ndef solve_multi_objective_schedule(courses, constraints, preferences):\n    """Solve multi-objective schedule optimization"""\n    \n    # Define the problem\n    problem = MultiObjectiveScheduleProblem(courses, constraints, preferences)\n    \n    # Configure the algorithm\n    algorithm = NSGA2(\n        pop_size=100,\n        sampling=IntegerRandomSampling(),\n        crossover=SBX(prob=0.9, eta=15),\n        mutation=PM(prob=0.1, eta=20),\n        eliminate_duplicates=True\n    )\n    \n    # Solve the problem\n    result = minimize(\n        problem,\n        algorithm,\n        ("n_gen", 100),  # 100 generations\n        verbose=False\n    )\n    \n    # Extract Pareto-optimal solutions\n    pareto_solutions = result.X\n    pareto_objectives = result.F\n    \n    # Select best compromise solution (closest to ideal point)\n    ideal_point = np.min(pareto_objectives, axis=0)\n    nadir_point = np.max(pareto_objectives, axis=0)\n    \n    # Normalize objectives\n    normalized_objectives = (pareto_objectives - ideal_point) / (nadir_point - ideal_point + 1e-10)\n    \n    # Find solution closest to origin (best compromise)\n    distances = np.sqrt(np.sum(normalized_objectives**2, axis=1))\n    best_idx = np.argmin(distances)\n    \n    best_solution = pareto_solutions[best_idx]\n    best_objectives = pareto_objectives[best_idx]\n    \n    return {\n        "best_schedule": convert_solution_to_schedule(best_solution, courses),\n        "best_objectives": {\n            "time_conflicts": float(best_objectives[0]),\n            "resource_utilization": float(-best_objectives[1]),  # Convert back to positive\n            "student_satisfaction": float(-best_objectives[2]),   # Convert back to positive\n            "workload_balance": float(best_objectives[3])\n        },\n        "pareto_front_size": len(pareto_solutions),\n        "alternative_solutions": [\n            {\n                "schedule": convert_solution_to_schedule(sol, courses),\n                "objectives": {\n                    "time_conflicts": float(obj[0]),\n                    "resource_utilization": float(-obj[1]),\n                    "student_satisfaction": float(-obj[2]),\n                    "workload_balance": float(obj[3])\n                }\n            }\n            for sol, obj in zip(pareto_solutions[:5], pareto_objectives[:5])  # Top 5 alternatives\n        ],\n        "optimization_stats": {\n            "generations": 100,\n            "population_size": 100,\n            "convergence_achieved": True\n        }\n    }\n\ndef convert_solution_to_schedule(solution, courses):\n    """Convert numeric solution to readable schedule format"""\n    schedule = []\n    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]\n    hours = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00"]\n    \n    for course_idx, time_slot in enumerate(solution):\n        course = courses[course_idx]\n        day_idx = time_slot // 7\n        hour_idx = time_slot % 7\n        \n        if day_idx < len(days) and hour_idx < len(hours):\n            schedule.append({\n                "course_id": course["id"],\n                "course_name": course["name"],\n                "day": days[day_idx],\n                "start_time": hours[hour_idx],\n                "end_time": calculate_end_time(hours[hour_idx], course.get("duration", 90)),\n                "instructor": course.get("instructor", "TBD"),\n                "room": assign_room_for_course(course),\n                "credits": course.get("credits", 3)\n            })\n    \n    return schedule\n\ndef calculate_end_time(start_time, duration_minutes):\n    """Calculate end time given start time and duration"""\n    from datetime import datetime, timedelta\n    start = datetime.strptime(start_time, "%H:%M")\n    end = start + timedelta(minutes=duration_minutes)\n    return end.strftime("%H:%M")\n\ndef assign_room_for_course(course):\n    """Assign room based on course requirements"""\n    resource_type = course.get("resource_type", "classroom")\n    capacity = course.get("capacity", 30)\n    \n    room_mapping = {\n        "classroom": f"Room A{100 + (capacity // 10)}",\n        "lab": f"Lab B{200 + (capacity // 10)}",\n        "lecture_hall": f"Hall C{300 + (capacity // 50)}"\n    }\n    \n    return room_mapping.get(resource_type, "Room A101")\n\n# Execute multi-objective optimization\nresult = solve_multi_objective_schedule(\n    course_data,\n    constraint_data,\n    preference_data\n)\n\nreturn result' } } },
        { id: 'llm-3', type: 'llm', position: { x: 640, y: 120 }, data: { config: { prompt: 'Analyze the multi-objective optimization results:\n\nBest Solution Objectives:\n- Time Conflicts: {{best_objectives.time_conflicts}}\n- Resource Utilization: {{best_objectives.resource_utilization}}%\n- Student Satisfaction: {{best_objectives.student_satisfaction}}%\n- Workload Balance: {{best_objectives.workload_balance}}\n\nPareto Front Size: {{pareto_front_size}} solutions\nOptimization Stats: {{optimization_stats}}\n\nProvide analysis on:\n1. Trade-offs between objectives\n2. Quality of the compromise solution\n3. Recommendations for stakeholders\n4. Alternative solutions worth considering\n5. Areas for further optimization\n\nFocus on actionable insights for decision makers.' } } },
        { id: 'var-3', type: 'variableAggregator', position: { x: 640, y: 280 }, data: { config: { operations: { 'total_courses': 'COUNT(schedule)', 'avg_satisfaction': 'AVG(student_satisfaction)', 'conflict_rate': 'SUM(conflicts)/COUNT(courses)', 'efficiency_score': '(resource_utilization + student_satisfaction) / 2' } } } },
        { id: 'template-3', type: 'template', position: { x: 820, y: 200 }, data: { config: { template: '# Multi-Objective Schedule Optimization Report\n\n## Executive Summary\n**Optimization Method**: NSGA-II Multi-Objective Genetic Algorithm\n**Solutions Evaluated**: {{optimization_stats.generations}} generations × {{optimization_stats.population_size}} population\n**Pareto-Optimal Solutions Found**: {{pareto_front_size}}\n\n## Best Compromise Solution\n\n### Objective Scores\n- 🎯 **Time Conflicts**: {{best_objectives.time_conflicts}} conflicts\n- 📊 **Resource Utilization**: {{best_objectives.resource_utilization}}%\n- 😊 **Student Satisfaction**: {{best_objectives.student_satisfaction}}%\n- ⚖️ **Workload Balance**: {{best_objectives.workload_balance}} (lower is better)\n\n### Performance Metrics\n- **Total Courses Scheduled**: {{total_courses}}\n- **Average Satisfaction**: {{avg_satisfaction}}%\n- **Conflict Rate**: {{conflict_rate}}%\n- **Overall Efficiency Score**: {{efficiency_score}}%\n\n## Optimized Schedule\n\n{{#each best_schedule}}\n### {{day}}\n{{#each courses}}\n- **{{course_name}}** ({{course_id}})\n  - 🕐 **Time**: {{start_time}} - {{end_time}}\n  - 🏠 **Room**: {{room}}\n  - 👨‍🏫 **Instructor**: {{instructor}}\n  - 📚 **Credits**: {{credits}}\n{{/each}}\n{{/each}}\n\n## Alternative Solutions\n\n{{#each alternative_solutions}}\n### Alternative {{@index}}\n- **Time Conflicts**: {{objectives.time_conflicts}}\n- **Resource Utilization**: {{objectives.resource_utilization}}%\n- **Student Satisfaction**: {{objectives.student_satisfaction}}%\n- **Workload Balance**: {{objectives.workload_balance}}\n\n*Trade-off Profile*: {{trade_off_description}}\n\n{{/each}}\n\n## Optimization Insights\n{{ai_insights}}\n\n## Recommendations\n1. **Immediate Actions**: Implement the best compromise solution\n2. **Alternative Consideration**: Review alternative solutions for specific stakeholder priorities\n3. **Future Optimization**: Monitor performance and adjust weights based on feedback\n4. **Continuous Improvement**: Regular re-optimization as preferences evolve\n\n---\n*Generated by Multi-Objective Schedule Optimizer v2.0*' } } },
        { id: 'end-3', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e3-1', source: 'start-3', target: 'file-3' },
        { id: 'e3-2', source: 'start-3', target: 'db-3' },
        { id: 'e3-3', source: 'file-3', target: 'code-3' },
        { id: 'e3-4', source: 'db-3', target: 'code-3' },
        { id: 'e3-5', source: 'code-3', target: 'llm-3' },
        { id: 'e3-6', source: 'code-3', target: 'var-3' },
        { id: 'e3-7', source: 'llm-3', target: 'template-3' },
        { id: 'e3-8', source: 'var-3', target: 'template-3' },
        { id: 'e3-9', source: 'template-3', target: 'end-3' }
      ]
    }
  },
  {
    id: '4',
    name: 'Quick Start Schedule Builder',
    description: 'Simple and fast schedule generation for beginners with guided setup',
    category: 'Data Processing',
    tags: ['beginner-friendly', 'quick-start', 'guided', 'simple'],
    icon: <Settings className="w-6 h-6" />,
    featured: false,
    downloads: 2892,
    rating: 4.5,
    preview: 'Easy-to-use template for creating basic schedules with step-by-step guidance',
    workflow: {
      nodes: [
        { id: 'start-4', type: 'start', position: { x: 100, y: 200 } },
        { id: 'file-4', type: 'fileUpload', position: { x: 280, y: 200 }, data: { config: { acceptedFormats: ['.csv', '.xlsx'], description: 'Upload simple course list' } } },
        { id: 'code-4', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'import pandas as pd\nimport random\nfrom datetime import datetime, timedelta\n\ndef create_simple_schedule(courses_df):\n    """Create a basic schedule using simple heuristics"""\n    \n    # Convert to list of dictionaries\n    courses = courses_df.to_dict("records")\n    \n    # Define available time slots\n    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]\n    times = ["09:00", "11:00", "14:00", "16:00"]\n    \n    # Simple scheduling algorithm\n    schedule = []\n    used_slots = set()\n    \n    for course in courses:\n        # Find first available slot\n        scheduled = False\n        attempts = 0\n        \n        while not scheduled and attempts < 20:\n            day = random.choice(days)\n            time = random.choice(times)\n            slot_key = f"{day}_{time}"\n            \n            if slot_key not in used_slots:\n                # Calculate duration (default 1.5 hours)\n                duration = course.get("duration", 90)\n                end_time = calculate_end_time(time, duration)\n                \n                schedule_item = {\n                    "course_name": course.get("name", "Unknown Course"),\n                    "course_code": course.get("code", ""),\n                    "day": day,\n                    "start_time": time,\n                    "end_time": end_time,\n                    "instructor": course.get("instructor", "TBA"),\n                    "room": assign_simple_room(course),\n                    "credits": course.get("credits", 3)\n                }\n                \n                schedule.append(schedule_item)\n                used_slots.add(slot_key)\n                scheduled = True\n            \n            attempts += 1\n        \n        if not scheduled:\n            # Force schedule in any available slot\n            for day in days:\n                for time in times:\n                    slot_key = f"{day}_{time}"\n                    if slot_key not in used_slots:\n                        schedule_item = {\n                            "course_name": course.get("name", "Unknown Course"),\n                            "course_code": course.get("code", ""),\n                            "day": day,\n                            "start_time": time,\n                            "end_time": calculate_end_time(time, 90),\n                            "instructor": course.get("instructor", "TBA"),\n                            "room": assign_simple_room(course),\n                            "credits": course.get("credits", 3),\n                            "note": "Auto-assigned due to constraints"\n                        }\n                        schedule.append(schedule_item)\n                        used_slots.add(slot_key)\n                        break\n                else:\n                    continue\n                break\n    \n    # Group by day for easier reading\n    schedule_by_day = {}\n    for item in schedule:\n        day = item["day"]\n        if day not in schedule_by_day:\n            schedule_by_day[day] = []\n        schedule_by_day[day].append(item)\n    \n    # Sort each day by time\n    for day in schedule_by_day:\n        schedule_by_day[day].sort(key=lambda x: x["start_time"])\n    \n    return {\n        "schedule": schedule,\n        "schedule_by_day": schedule_by_day,\n        "total_courses": len(schedule),\n        "total_credits": sum(item.get("credits", 3) for item in schedule),\n        "utilization": len(used_slots) / (len(days) * len(times)),\n        "warnings": get_schedule_warnings(schedule)\n    }\n\ndef calculate_end_time(start_time, duration_minutes):\n    """Calculate end time"""\n    from datetime import datetime, timedelta\n    start = datetime.strptime(start_time, "%H:%M")\n    end = start + timedelta(minutes=duration_minutes)\n    return end.strftime("%H:%M")\n\ndef assign_simple_room(course):\n    """Assign a simple room based on course type"""\n    course_name = course.get("name", "").lower()\n    \n    if "lab" in course_name or "computer" in course_name:\n        return "Computer Lab 1"\n    elif "math" in course_name or "science" in course_name:\n        return "Science Room 101"\n    elif "english" in course_name or "literature" in course_name:\n        return "Classroom A102"\n    else:\n        return "General Classroom"\n\ndef get_schedule_warnings(schedule):\n    """Generate helpful warnings and suggestions"""\n    warnings = []\n    \n    # Check for heavy days\n    daily_load = {}\n    for item in schedule:\n        day = item["day"]\n        if day not in daily_load:\n            daily_load[day] = 0\n        daily_load[day] += 1\n    \n    for day, load in daily_load.items():\n        if load > 3:\n            warnings.append(f"Heavy schedule on {day} ({load} courses)")\n    \n    # Check for back-to-back classes\n    for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:\n        day_classes = [item for item in schedule if item["day"] == day]\n        if len(day_classes) > 1:\n            day_classes.sort(key=lambda x: x["start_time"])\n            for i in range(len(day_classes) - 1):\n                current_end = day_classes[i]["end_time"]\n                next_start = day_classes[i + 1]["start_time"]\n                if current_end >= next_start:\n                    warnings.append(f"Potential conflict on {day}: {day_classes[i][\'course_name\']} and {day_classes[i + 1][\'course_name\']}")\n    \n    if not warnings:\n        warnings.append("Schedule looks good! No major issues detected.")\n    \n    return warnings\n\n# Process the uploaded course data\nresult = create_simple_schedule(uploaded_courses)\nreturn result' } } },
        { id: 'template-4', type: 'template', position: { x: 640, y: 200 }, data: { config: { template: '# Quick Start Schedule\n\n## 📊 Schedule Summary\n- **Total Courses**: {{total_courses}}\n- **Total Credits**: {{total_credits}}\n- **Time Slot Utilization**: {{utilization}}%\n\n## 📅 Weekly Schedule\n\n{{#each schedule_by_day}}\n### {{@key}}\n{{#each this}}\n- **{{start_time}} - {{end_time}}**: {{course_name}} ({{course_code}})\n  - 👨‍🏫 Instructor: {{instructor}}\n  - 🏠 Room: {{room}}\n  - 📚 Credits: {{credits}}\n  {{#if note}}⚠️ *{{note}}*{{/if}}\n{{/each}}\n\n{{/each}}\n\n## ⚠️ Schedule Warnings & Suggestions\n{{#each warnings}}\n- {{this}}\n{{/each}}\n\n## 🎯 Next Steps\n1. **Review Schedule**: Check if the generated schedule meets your needs\n2. **Adjust Conflicts**: Manually resolve any time conflicts if needed\n3. **Optimize Further**: Use advanced templates for more sophisticated optimization\n4. **Export Schedule**: Save or export your schedule for use\n\n---\n*Generated by Quick Start Schedule Builder*\n*For more advanced features, try our AI-powered optimization templates!*' } } },
        { id: 'end-4', type: 'end', position: { x: 820, y: 200 } }
      ],
      edges: [
        { id: 'e4-1', source: 'start-4', target: 'file-4' },
        { id: 'e4-2', source: 'file-4', target: 'code-4' },
        { id: 'e4-3', source: 'code-4', target: 'template-4' },
        { id: 'e4-4', source: 'template-4', target: 'end-4' }
      ]
    }
  },
  {
    id: '4',
    name: 'Predictive Schedule Analytics',
    description: 'AI-powered analytics for schedule optimization and trend prediction',
    category: 'AI Helper',
    tags: ['analytics', 'prediction', 'optimization'],
    icon: <Bot className="w-6 h-6" />,
    featured: true,
    downloads: 2456,
    rating: 4.9,
    preview: 'Advanced analytics engine that predicts scheduling patterns and suggests proactive optimizations',
    workflow: {
      nodes: [
        { id: 'start-4', type: 'start', position: { x: 100, y: 200 } },
        { id: 'db-4', type: 'database', position: { x: 280, y: 120 }, data: { config: { query: 'SELECT * FROM historical_schedules JOIN performance_metrics ON historical_schedules.id = performance_metrics.schedule_id ORDER BY semester DESC LIMIT 1000', description: 'Load historical data' } } },
        { id: 'code-4', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'import pandas as pd\nimport numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.model_selection import train_test_split\n\ndef analyze_schedule_patterns(historical_data):\n    # Feature engineering\n    features = extract_features(historical_data)\n    \n    # Predictive modeling\n    X = features[[\'time_slot_efficiency\', \'resource_utilization\', \'conflict_rate\', \'student_satisfaction\']]\n    y = features[\'overall_score\']\n    \n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n    \n    model = RandomForestRegressor(n_estimators=100)\n    model.fit(X_train, y_train)\n    \n    # Predictions for current semester\n    predictions = model.predict(current_schedule_features)\n    \n    # Identify optimization opportunities\n    optimization_suggestions = generate_suggestions(model, features)\n    \n    return {\n        "predictions": predictions,\n        "suggestions": optimization_suggestions,\n        "model_accuracy": model.score(X_test, y_test)\n    }\n\nresult = analyze_schedule_patterns(historical_schedules)\nreturn result' } } },
        { id: 'llm-4', type: 'llm', position: { x: 640, y: 120 }, data: { config: { prompt: 'Based on the predictive analytics results:\n\nModel Accuracy: {{model_accuracy}}\nPredicted Performance: {{predictions}}\nOptimization Suggestions: {{suggestions}}\n\nGenerate a comprehensive report that includes:\n1. Executive Summary of schedule performance\n2. Key insights and trends identified\n3. Specific improvement recommendations\n4. Risk factors to monitor\n5. Implementation priority matrix\n\nMake the report actionable for academic administrators.' } } },
        { id: 'template-4', type: 'template', position: { x: 640, y: 280 }, data: { config: { template: '# Schedule Analytics Report\n\n## Executive Summary\n{{executive_summary}}\n\n## Performance Metrics\n- **Overall Score**: {{overall_score}}/10\n- **Resource Utilization**: {{resource_utilization}}%\n- **Conflict Rate**: {{conflict_rate}}%\n- **Student Satisfaction**: {{student_satisfaction}}/5\n\n## Optimization Opportunities\n{{#each suggestions}}\n### {{title}}\n- **Impact**: {{impact}}\n- **Effort**: {{effort}}\n- **Timeline**: {{timeline}}\n- **Description**: {{description}}\n{{/each}}\n\n## Trend Analysis\n{{trend_analysis}}\n\n## Recommendations\n{{recommendations}}' } } },
        { id: 'http-4', type: 'httpRequest', position: { x: 820, y: 200 }, data: { config: { url: '/api/reports/schedule-analytics', method: 'POST', body: '{{analytics_report}}', description: 'Save analytics report' } } },
        { id: 'end-4', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e4-1', source: 'start-4', target: 'db-4' },
        { id: 'e4-2', source: 'db-4', target: 'code-4' },
        { id: 'e4-3', source: 'code-4', target: 'llm-4' },
        { id: 'e4-4', source: 'code-4', target: 'template-4' },
        { id: 'e4-5', source: 'llm-4', target: 'http-4' },
        { id: 'e4-6', source: 'template-4', target: 'http-4' },
        { id: 'e4-7', source: 'http-4', target: 'end-4' }
      ]
    }
  },
  {
    id: '5',
    name: 'Multi-Campus Schedule Sync',
    description: 'Synchronize and coordinate schedules across multiple campus locations',
    category: 'API Integration',
    tags: ['multi-campus', 'synchronization', 'coordination'],
    icon: <Globe className="w-6 h-6" />,
    featured: false,
    downloads: 943,
    rating: 4.4,
    preview: 'Seamlessly coordinate schedules across different campus locations with resource sharing',
    workflow: {
      nodes: [
        { id: 'start-5', type: 'start', position: { x: 100, y: 200 } },
        { id: 'http1-5', type: 'httpRequest', position: { x: 280, y: 120 }, data: { config: { url: '/api/campus/main/schedules', method: 'GET', description: 'Fetch main campus schedule' } } },
        { id: 'http2-5', type: 'httpRequest', position: { x: 280, y: 200 }, data: { config: { url: '/api/campus/north/schedules', method: 'GET', description: 'Fetch north campus schedule' } } },
        { id: 'http3-5', type: 'httpRequest', position: { x: 280, y: 280 }, data: { config: { url: '/api/campus/south/schedules', method: 'GET', description: 'Fetch south campus schedule' } } },
        { id: 'code-5', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'def synchronize_multi_campus(main_schedule, north_schedule, south_schedule):\n    # Merge all campus schedules\n    all_schedules = {\n        "main": main_schedule,\n        "north": north_schedule,\n        "south": south_schedule\n    }\n    \n    # Detect cross-campus conflicts\n    cross_campus_conflicts = []\n    for campus1, schedule1 in all_schedules.items():\n        for campus2, schedule2 in all_schedules.items():\n            if campus1 != campus2:\n                conflicts = find_shared_resource_conflicts(schedule1, schedule2)\n                if conflicts:\n                    cross_campus_conflicts.extend(conflicts)\n    \n    # Optimize resource allocation\n    optimized_allocation = optimize_cross_campus_resources(\n        all_schedules, \n        cross_campus_conflicts\n    )\n    \n    # Generate sync plan\n    sync_plan = {\n        "conflicts_resolved": len(cross_campus_conflicts),\n        "resource_optimizations": optimized_allocation,\n        "sync_schedule": generate_sync_schedule(all_schedules)\n    }\n    \n    return sync_plan\n\nresult = synchronize_multi_campus(main_data, north_data, south_data)\nreturn result' } } },
        { id: 'llm-5', type: 'llm', position: { x: 640, y: 120 }, data: { config: { prompt: 'Review the multi-campus synchronization results:\n\n{{sync_results}}\n\nAnalyze the coordination plan and provide recommendations for:\n1. Resource sharing optimization\n2. Transportation scheduling between campuses\n3. Faculty allocation efficiency\n4. Student convenience improvements\n5. Cost reduction opportunities\n\nEnsure all recommendations maintain academic quality and accessibility.' } } },
        { id: 'iter-5', type: 'iteration', position: { x: 640, y: 280 }, data: { config: { collection: 'campus_schedules', itemName: 'campus_schedule' } } },
        { id: 'http4-5', type: 'httpRequest', position: { x: 820, y: 200 }, data: { config: { url: '/api/campus/{{campus_id}}/schedules/sync', method: 'PUT', body: '{{synchronized_schedule}}', description: 'Update campus schedule' } } },
        { id: 'end-5', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e5-1', source: 'start-5', target: 'http1-5' },
        { id: 'e5-2', source: 'start-5', target: 'http2-5' },
        { id: 'e5-3', source: 'start-5', target: 'http3-5' },
        { id: 'e5-4', source: 'http1-5', target: 'code-5' },
        { id: 'e5-5', source: 'http2-5', target: 'code-5' },
        { id: 'e5-6', source: 'http3-5', target: 'code-5' },
        { id: 'e5-7', source: 'code-5', target: 'llm-5' },
        { id: 'e5-8', source: 'code-5', target: 'iter-5' },
        { id: 'e5-9', source: 'llm-5', target: 'http4-5' },
        { id: 'e5-10', source: 'iter-5', target: 'http4-5' },
        { id: 'e5-11', source: 'http4-5', target: 'end-5' }
      ]
    }
  },
  {
    id: '6',
    name: 'Adaptive Schedule Generator',
    description: 'Dynamic schedule generation that adapts to real-time constraints and preferences',
    category: 'Data Processing',
    tags: ['adaptive', 'dynamic', 'real-time'],
    icon: <Zap className="w-6 h-6" />,
    featured: false,
    downloads: 1589,
    rating: 4.6,
    preview: 'Intelligent schedule generator that continuously adapts to changing requirements and constraints',
    workflow: {
      nodes: [
        { id: 'start-6', type: 'start', position: { x: 100, y: 200 } },
        { id: 'file-6', type: 'fileUpload', position: { x: 280, y: 120 }, data: { config: { acceptedFormats: ['.json', '.csv'], description: 'Upload requirements and constraints' } } },
        { id: 'monitor-6', type: 'systemMonitor', position: { x: 280, y: 280 }, data: { config: { interval: 60, target: 'constraint_changes', metrics: ['new_requirements', 'updated_preferences', 'resource_availability'] } } },
        { id: 'code-6', type: 'code', position: { x: 460, y: 200 }, data: { config: { code: 'import json\nfrom datetime import datetime\n\nclass AdaptiveScheduler:\n    def __init__(self, constraints, preferences):\n        self.constraints = constraints\n        self.preferences = preferences\n        self.adaptation_history = []\n    \n    def generate_adaptive_schedule(self, real_time_data):\n        # Dynamic constraint evaluation\n        current_constraints = self.update_constraints(real_time_data)\n        \n        # Multi-objective optimization\n        schedule = self.multi_objective_optimization(\n            constraints=current_constraints,\n            preferences=self.preferences,\n            real_time_factors=real_time_data\n        )\n        \n        # Adaptability scoring\n        adaptability_score = self.calculate_adaptability(schedule)\n        \n        # Learning from previous adaptations\n        self.learn_from_adaptations(schedule, real_time_data)\n        \n        return {\n            "schedule": schedule,\n            "adaptability_score": adaptability_score,\n            "adaptation_log": self.adaptation_history[-10:],\n            "confidence_level": self.calculate_confidence(schedule)\n        }\n    \n    def multi_objective_optimization(self, constraints, preferences, real_time_factors):\n        # Implement NSGA-II or similar multi-objective algorithm\n        objectives = [\n            self.minimize_conflicts,\n            self.maximize_preferences,\n            self.optimize_resource_usage,\n            self.maximize_adaptability\n        ]\n        \n        return self.nsga_ii_algorithm(objectives, constraints, real_time_factors)\n\nscheduler = AdaptiveScheduler(input_constraints, input_preferences)\nresult = scheduler.generate_adaptive_schedule(real_time_changes)\nreturn result' } } },
        { id: 'llm-6', type: 'llm', position: { x: 640, y: 120 }, data: { config: { prompt: 'Analyze the adaptive schedule generation results:\n\nGenerated Schedule: {{schedule}}\nAdaptability Score: {{adaptability_score}}\nConfidence Level: {{confidence_level}}\nAdaptation History: {{adaptation_log}}\n\nProvide insights on:\n1. Schedule quality and robustness\n2. Adaptation effectiveness\n3. Areas for improvement\n4. Risk assessment for future changes\n5. Recommendations for stakeholders\n\nFocus on actionable insights for schedule management.' } } },
        { id: 'var-6', type: 'variableAggregator', position: { x: 640, y: 280 }, data: { config: { operations: { 'total_adaptations': 'COUNT(adaptations)', 'avg_confidence': 'AVG(confidence_scores)', 'improvement_rate': 'TREND(quality_metrics)' } } } },
        { id: 'template-6', type: 'template', position: { x: 820, y: 200 }, data: { config: { template: '# Adaptive Schedule Report\n\n## Schedule Overview\n- **Generation Time**: {{timestamp}}\n- **Adaptability Score**: {{adaptability_score}}/10\n- **Confidence Level**: {{confidence_level}}%\n- **Total Adaptations**: {{total_adaptations}}\n\n## Performance Metrics\n- **Conflict Resolution**: {{conflicts_resolved}}\n- **Preference Satisfaction**: {{preference_satisfaction}}%\n- **Resource Utilization**: {{resource_utilization}}%\n- **Adaptation Speed**: {{adaptation_speed}}ms\n\n## Schedule Details\n{{#each daily_schedules}}\n### {{day}}\n{{#each time_slots}}\n- **{{start_time}}-{{end_time}}**: {{course_name}} ({{room}}) - Confidence: {{confidence}}%\n{{/each}}\n{{/each}}\n\n## Adaptation History\n{{#each recent_adaptations}}\n- **{{timestamp}}**: {{change_description}} - Impact: {{impact_level}}\n{{/each}}\n\n## Recommendations\n{{recommendations}}' } } },
        { id: 'end-6', type: 'end', position: { x: 1000, y: 200 } }
      ],
      edges: [
        { id: 'e6-1', source: 'start-6', target: 'file-6' },
        { id: 'e6-2', source: 'start-6', target: 'monitor-6' },
        { id: 'e6-3', source: 'file-6', target: 'code-6' },
        { id: 'e6-4', source: 'monitor-6', target: 'code-6' },
        { id: 'e6-5', source: 'code-6', target: 'llm-6' },
        { id: 'e6-6', source: 'code-6', target: 'var-6' },
        { id: 'e6-7', source: 'llm-6', target: 'template-6' },
        { id: 'e6-8', source: 'var-6', target: 'template-6' },
        { id: 'e6-9', source: 'template-6', target: 'end-6' }
      ]
    }
  },
  {
    id: '7',
    name: '🎮 Discord Community Manager',
    description: 'Advanced Discord bot automation for community management, event scheduling, and member engagement',
    category: 'Eval Mode',
    tags: ['discord', 'automation', 'community', 'bot', 'eval'],
    icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
    featured: true,
    downloads: 847,
    rating: 4.8,
    preview: '⚠️ Eval Mode: Automated Discord bot for community management with event scheduling, member monitoring, and auto-moderation capabilities',
    workflow: {
      nodes: [
        { id: 'start-7', type: 'start', position: { x: 50, y: 250 } },
        { id: 'file-7', type: 'fileUpload', position: { x: 220, y: 250 }, data: { config: { acceptedFormats: ['.json'], description: 'Discord Bot Configuration' } } },
        { id: 'discord-7a', type: 'discord-caller', position: { x: 420, y: 80 }, data: { config: { action: 'listen_events', channels: ['general', 'announcements'], autoReply: true } } },
        { id: 'monitor-7', type: 'system-monitor', position: { x: 420, y: 250 }, data: { config: { interval: 60, target: 'member_activity', metrics: ['new_joins', 'messages', 'reactions'] } } },
        { id: 'discord-7b', type: 'discord-caller', position: { x: 420, y: 420 }, data: { config: { action: 'send_message', autoModeration: true, welcomeMessages: true } } },
        { id: 'code-7', type: 'code', position: { x: 650, y: 250 }, data: { config: { code: 'def manage_community(events, members):\n    # Auto-welcome new members\n    new_members = [m for m in members if m.is_new]\n    for member in new_members:\n        send_welcome(member)\n    \n    # Schedule weekly events\n    if is_friday():\n        create_event("Community Meetup", "Friday 7PM")\n    \n    # Auto-moderate spam\n    flagged = detect_spam(events)\n    for msg in flagged:\n        moderate_message(msg)\n    \n    return {"managed": len(new_members), "events": 1}' } } },
        { id: 'llm-7', type: 'llm', position: { x: 880, y: 150 }, data: { config: { prompt: 'Analyze Discord community health: {{member_count}} members, {{activity_score}} activity. Suggest engagement strategies.' } } },
        { id: 'discord-7c', type: 'discord-caller', position: { x: 880, y: 350 }, data: { config: { action: 'create_event', scheduleReminders: true } } },
        { id: 'template-7', type: 'template', position: { x: 1110, y: 200 }, data: { config: { template: '# Discord Community Report\n\n## Stats\n- Members: {{member_count}}\n- Activity: {{activity_score}}\n- Events: {{events_scheduled}}\n\n## Actions Taken\n- Welcomed {{new_members}} members\n- Moderated {{spam_count}} messages\n- Created {{events_count}} events' } } },
        { id: 'webhook-7', type: 'webhook', position: { x: 1110, y: 380 }, data: { config: { url: 'https://discord.com/api/webhooks/{id}', method: 'POST' } } },
        { id: 'end-7', type: 'end', position: { x: 1340, y: 250 } }
      ],
      edges: [
        { id: 'e7-1', source: 'start-7', target: 'file-7' },
        { id: 'e7-2', source: 'start-7', target: 'monitor-7' },
        { id: 'e7-3', source: 'file-7', target: 'discord-7a' },
        { id: 'e7-4', source: 'discord-7a', target: 'code-7' },
        { id: 'e7-5', source: 'monitor-7', target: 'code-7' },
        { id: 'e7-6', source: 'monitor-7', target: 'discord-7b' },
        { id: 'e7-7', source: 'discord-7b', target: 'code-7' },
        { id: 'e7-8', source: 'code-7', target: 'llm-7' },
        { id: 'e7-9', source: 'code-7', target: 'discord-7c' },
        { id: 'e7-10', source: 'llm-7', target: 'template-7' },
        { id: 'e7-11', source: 'discord-7c', target: 'template-7' },
        { id: 'e7-12', source: 'template-7', target: 'webhook-7' },
        { id: 'e7-13', source: 'webhook-7', target: 'end-7' }
      ]
    }
  },
  {
    id: '8',
    name: '🛡️ Network Security Tester',
    description: 'Advanced network security testing with DDoS simulation, vulnerability scanning, and penetration testing',
    category: 'Eval Mode',
    tags: ['security', 'ddos', 'pentesting', 'network', 'eval'],
    icon: <Shield className="w-6 h-6 text-red-500" />,
    featured: true,
    downloads: 523,
    rating: 4.9,
    preview: '⚠️ Eval Mode: Professional security testing suite with controlled DDoS simulation, port scanning, and vulnerability assessment. Use responsibly!',
    workflow: {
      nodes: [
        { id: 'start-8', type: 'start', position: { x: 50, y: 250 } },
        { id: 'file-8', type: 'fileUpload', position: { x: 220, y: 250 }, data: { config: { acceptedFormats: ['.txt', '.json'], description: 'Target Configuration' } } },
        { id: 'scanner-8a', type: 'network-scanner', position: { x: 420, y: 80 }, data: { config: { scanType: 'port_scan', ports: '1-1000', timeout: 3000 } } },
        { id: 'scanner-8b', type: 'network-scanner', position: { x: 420, y: 250 }, data: { config: { scanType: 'vulnerability_scan', deepScan: true } } },
        { id: 'prank-8', type: 'prank-notifier', position: { x: 420, y: 420 }, data: { config: { type: 'ddos_simulation', intensity: 'low', duration: 30 } } },
        { id: 'code-8', type: 'code', position: { x: 650, y: 250 }, data: { config: { code: 'def security_test(target, scan_results):\n    # Analyze vulnerabilities\n    vulns = []\n    for port in scan_results.open_ports:\n        if port in [21, 23, 1433]:  # High-risk ports\n            vulns.append({"port": port, "severity": "high"})\n    \n    # Simulate controlled DDoS\n    stress_result = simulate_traffic_load(\n        target=target,\n        requests_per_sec=100,\n        duration=30\n    )\n    \n    # Calculate security score\n    score = 100 - (len(vulns) * 10)\n    \n    return {\n        "vulnerabilities": vulns,\n        "stress_test": stress_result,\n        "security_score": max(score, 0)\n    }' } } },
        { id: 'llm-8', type: 'llm', position: { x: 880, y: 150 }, data: { config: { prompt: 'Security Analysis:\nVulnerabilities: {{vulnerabilities}}\nDDoS Resilience: {{ddos_score}}\nSecurity Score: {{security_score}}/100\n\nProvide remediation steps and security recommendations.' } } },
        { id: 'var-8', type: 'variableAggregator', position: { x: 880, y: 350 }, data: { config: { operations: { 'total_vulns': 'COUNT(vulnerabilities)', 'critical_issues': 'FILTER(severity="high")', 'overall_score': 'AVG(security_score)' } } } },
        { id: 'template-8', type: 'template', position: { x: 1110, y: 250 }, data: { config: { template: '# Security Assessment Report\n\n## Overview\n- Security Score: {{security_score}}/100\n- Risk Level: {{risk_level}}\n- Vulnerabilities: {{total_vulns}}\n\n## Findings\n### Critical Issues\n{{#each critical_issues}}\n- Port {{port}}: {{description}}\n{{/each}}\n\n## DDoS Resilience\n- Stress Test Result: {{stress_result}}\n- Max Throughput: {{max_throughput}}\n\n## Recommendations\n{{recommendations}}' } } },
        { id: 'http-8', type: 'httpRequest', position: { x: 1110, y: 420 }, data: { config: { url: 'https://security-dashboard.local/report', method: 'POST' } } },
        { id: 'end-8', type: 'end', position: { x: 1340, y: 300 } }
      ],
      edges: [
        { id: 'e8-1', source: 'start-8', target: 'file-8' },
        { id: 'e8-2', source: 'file-8', target: 'scanner-8a' },
        { id: 'e8-3', source: 'file-8', target: 'scanner-8b' },
        { id: 'e8-4', source: 'file-8', target: 'prank-8' },
        { id: 'e8-5', source: 'scanner-8a', target: 'code-8' },
        { id: 'e8-6', source: 'scanner-8b', target: 'code-8' },
        { id: 'e8-7', source: 'prank-8', target: 'code-8' },
        { id: 'e8-8', source: 'code-8', target: 'llm-8' },
        { id: 'e8-9', source: 'code-8', target: 'var-8' },
        { id: 'e8-10', source: 'llm-8', target: 'template-8' },
        { id: 'e8-11', source: 'var-8', target: 'template-8' },
        { id: 'e8-12', source: 'template-8', target: 'http-8' },
        { id: 'e8-13', source: 'http-8', target: 'end-8' }
      ]
    }
  }
];

const categories = ['All', 'AI Helper', 'Schedule Optimization', 'Data Processing', 'Automatic Notification', 'API Integration', 'Eval Mode'];

interface TemplatesPageProps {
  onPageChange?: (page: string) => void;
}

export default function TemplatesPage({ onPageChange }: TemplatesPageProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [importingTemplate, setImportingTemplate] = useState<string | null>(null);
  const { setNodes, setEdges, newWorkflow } = useWorkflowStore();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
  };

  const handleImportTemplate = async (template: Template) => {
    setImportingTemplate(template.id);
    
    try {
      // Clear current workflow
      newWorkflow();
      
      // Create new nodes with correct data structure
      const newNodes = template.workflow.nodes.map(node => ({
        id: node.id,
        type: node.type, // Use actual node type
        position: node.position,
        data: {
          label: getNodeLabel(node.type),
          type: node.type as NodeType,
          category: getNodeCategory(node.type),
          status: 'idle' as const,
          config: node.data?.config || {}
        }
      }));
      
      // Create new edges
      const newEdges = template.workflow.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep'
      }));
      
      // Set new nodes and edges
      setNodes(newNodes);
      setEdges(newEdges);
      
      console.log('Template imported successfully:', template.name);
      
      // 等待一小段时间显示反馈
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 切换到工作流页面
      if (onPageChange) {
        onPageChange('workflow');
      }
    } catch (error) {
      console.error('Error importing template:', error);
    } finally {
      setImportingTemplate(null);
    }
  };
  
  // Helper function: Get node label based on node type
  const getNodeLabel = (type: string): string => {
    const labelMap: Record<string, string> = {
      'start': 'Start',
      'end': 'End',
      'llm': 'LLM Processing',
      'httpRequest': 'HTTP Request',
      'fileUpload': 'File Upload',
      'code': 'Code Execution',
      'database': 'Database',
      'ifElse': 'If/Else',
      'template': 'Template',
      'systemMonitor': 'System Monitor',
      'webhook': 'Webhook',
      'delay': 'Delay',
      'loop': 'Loop',
      'variableAssign': 'Variable Assignment',
      'iteration': 'Iteration',
      'variableAggregator': 'Variable Aggregator'
    };
    return labelMap[type] || type;
  };
  
  // Helper function: Get node category based on node type
  const getNodeCategory = (type: string): NodeCategory => {
    const categoryMap: Record<string, NodeCategory> = {
      'start': 'input-output',
      'end': 'input-output',
      'llm': 'ai-llm',
      'httpRequest': 'input-output',
      'fileUpload': 'input-output',
      'code': 'transform',
      'database': 'input-output',
      'ifElse': 'logic',
      'template': 'transform',
      'systemMonitor': 'utilities',
      'webhook': 'utilities',
      'delay': 'utilities',
      'loop': 'logic',
      'variableAssign': 'transform',
      'iteration': 'logic',
      'variableAggregator': 'transform'
    };
    return categoryMap[type] || 'utilities';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-10 h-10 text-yellow-300 animate-pulse mr-3" />
              <h1 className="text-4xl font-bold text-white">Workflow Templates</h1>
              <Zap className="w-10 h-10 text-yellow-300 animate-pulse ml-3" />
            </div>
            <p className="mt-3 text-xl text-blue-100 max-w-2xl mx-auto">
              Jump-start your automation with pre-built workflow templates
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Bot className="w-5 h-5" />
                <span className="font-medium">{templates.length} Templates</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
                <span className="font-medium">{templates.filter(t => t.featured).length} Featured</span>
              </div>
              <div className="flex items-center space-x-2 bg-orange-500/20 px-4 py-2 rounded-full backdrop-blur-sm border border-orange-300">
                <AlertTriangle className="w-5 h-5 text-orange-300" />
                <span className="font-medium">{templates.filter(t => t.category === 'Eval Mode').length} Eval Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Category:</span>
              </div>
              <select
                className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:border-gray-400 transition-colors font-medium"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'Eval Mode' ? '⚠️ ' : ''}{category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Templates */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" />
              Featured Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(t => t.featured).map(template => (
                <div 
                  key={template.id} 
                  className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 ${
                    template.category === 'Eval Mode' 
                      ? 'border-orange-400 bg-gradient-to-br from-white to-orange-50' 
                      : 'border-gray-200'
                  }`}
                >
                  {/* Eval Mode Warning Badge */}
                  {template.category === 'Eval Mode' && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 animate-pulse" />
                      <span className="text-xs font-bold">EVAL MODE - Use Responsibly</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          template.category === 'Eval Mode' 
                            ? 'bg-orange-100' 
                            : 'bg-blue-100'
                        }`}>
                          {template.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            template.category === 'Eval Mode'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {template.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(template.id)}
                        className={`p-1 rounded transition-transform hover:scale-110 ${
                          favorites.has(template.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className="w-5 h-5" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <span className="font-semibold">{template.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleImportTemplate(template)}
                        disabled={importingTemplate === template.id}
                        className={`flex-1 px-4 py-2 rounded-lg transition-all flex items-center justify-center space-x-2 group font-medium ${
                          template.category === 'Eval Mode'
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
                      >
                        {importingTemplate === template.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Importing...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>Import</span>
                          </>
                        )}
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            {selectedCategory === 'All' ? (
              <>
                <Database className="w-6 h-6 text-blue-500 mr-2" />
                All Templates
              </>
            ) : selectedCategory === 'Eval Mode' ? (
              <>
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
                {selectedCategory}
              </>
            ) : (
              selectedCategory
            )}
            <span className="text-lg text-gray-500 font-normal ml-2">({filteredTemplates.length})</span>
          </h2>
          
          {/* Eval Mode Warning */}
          {selectedCategory === 'Eval Mode' && (
            <div className="mb-6 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-400 rounded-xl p-4 flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-orange-900 mb-1">⚠️ Eval Mode Templates - Important Notice</h3>
                <p className="text-sm text-orange-800">
                  These templates contain advanced automation features including Discord bot management and network security testing. 
                  <span className="font-semibold"> Use only in authorized environments and for educational purposes.</span> 
                  Ensure you have proper permissions before deploying these workflows.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className={`bg-white rounded-lg shadow border-2 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 ${
                  template.category === 'Eval Mode' 
                    ? 'border-orange-300 hover:border-orange-400' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className={`p-1.5 rounded ${
                        template.category === 'Eval Mode' 
                          ? 'bg-orange-100' 
                          : 'bg-blue-100'
                      }`}>
                        {template.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{template.name}</h3>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          template.category === 'Eval Mode'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {template.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      className={`p-1 rounded transition-transform hover:scale-110 flex-shrink-0 ${
                        favorites.has(template.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={favorites.has(template.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2 h-8">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3 min-h-[24px]">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span className="font-medium">{template.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                      <span className="font-semibold">{template.rating}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleImportTemplate(template)}
                    disabled={importingTemplate === template.id}
                    className={`w-full px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-center space-x-1 group font-medium shadow-sm hover:shadow-md ${
                      template.category === 'Eval Mode'
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {importingTemplate === template.id ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Importing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        <span>Import</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}