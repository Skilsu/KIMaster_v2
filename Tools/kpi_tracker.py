import time
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

class KpiTracker:
    def __init__(self):
        self.accuracies = []
        self.reaction_times = []
        self.precisions = []
        self.recalls = []
        self.f1_scores = []

    def track_performance(self, y_true, y_pred, start_time, end_time):
        # Genaugkeit berechnen
        accuracy = accuracy_score(y_true, y_pred)
        self.accuracies.append(accuracy)

        # Reaktionszeit berechnen
        reaction_time = end_time - start_time
        self.reaction_times.append(reaction_time)

        # Entscheidungsqualität berechnen
        precision = precision_score(y_true, y_pred, average='weighted')
        recall = recall_score(y_true, y_pred, average='weighted')
        f1 = f1_score(y_true, y_pred, average='weighted')

        self.precisions.append(precision)
        self.recalls.append(recall)
        self.f1_scores.append(f1)

    def get_average_kpis(self):
        avg_accuracy = sum(self.accuracies) / len(self.accuracies) if self.accuracies else 0
        avg_reaction_time = sum(self.reaction_times) / len(self.reaction_times) if self.reaction_times else 0
        avg_precision = sum(self.precisions) / len(self.precisions) if self.precisions else 0
        avg_recall = sum(self.recalls) / len(self.recalls) if self.recalls else 0
        avg_f1 = sum(self.f1_scores) / len(self.f1_scores) if self.f1_scores else 0

        return {
            'average_accuracy': avg_accuracy,
            'average_reaction_time': avg_reaction_time,
            'average_precision': avg_precision,
            'average_recall': avg_recall,
            'average_f1_score': avg_f1
        }




