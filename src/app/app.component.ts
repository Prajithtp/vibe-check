import { Component } from '@angular/core';
import { VibeService, Vibe } from './vibe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  currentMood: string = '';
  selectedColor: string = '#3498db';
  filterText: string = '';

  constructor(private vibeService: VibeService) {}
  get filteredVibes(): Vibe[] {
    return this.vibeService.getHistory().filter(v => 
      v.mood.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  saveVibe() {
    if (this.currentMood) {
      this.vibeService.addVibe(this.currentMood, this.selectedColor);
      this.currentMood = ''; // Reset input
    }
  }

  get vibes(): Vibe[] {
    return this.vibeService.getHistory();
  }
  // Add this method inside your AppComponent class
clearHistory() {
  this.vibeService.clearAllVibes();
}
// Add this method to your AppComponent
removeVibe(index: number) {
  this.vibeService.deleteVibe(index);
}
get vibeStreak(): number {
  const today = new Date().toDateString();
  let streak = 0;
  const history = this.vibeService.getHistory();

  for (let v of history) {
    if (v.time.toDateString() === today) {
      streak++;
    } else {
      break; // Stop counting if we hit a different day
    }
  }
  return streak;
}
get dominantColor(): string {
  const history = this.vibeService.getHistory();
  if (history.length === 0) return '#2c3e50'; // Default background

  const colorCounts: { [key: string]: number } = {};
  
  // Count occurrences of each color
  history.forEach(v => {
    colorCounts[v.color] = (colorCounts[v.color] || 0) + 1;
  });

  // Find the color with the highest count
  return Object.keys(colorCounts).reduce((a, b) => 
    colorCounts[a] > colorCounts[b] ? a : b
  );
}

get weeklyStats() {
  const history = this.vibeService.getHistory();
  const stats = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toDateString();
    
    const count = history.filter(v => v.time.toDateString() === dateString).length;
    
    stats.push({
      day: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      count: count
    });
  }
  return stats.reverse(); // Show oldest to newest (left to right)
}

}