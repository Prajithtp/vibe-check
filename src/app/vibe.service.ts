import { Injectable } from '@angular/core';

export interface Vibe {
  mood: string;
  color: string;
  time: Date;
}

@Injectable({ providedIn: 'root' })
export class VibeService {
  private history: Vibe[] = [];

  // constructor() {
  //   // 1. LOAD data from storage when the service starts
  //   const saved = localStorage.getItem('my_vibes');
  //   if (saved) {
  //     this.history = JSON.parse(saved);
  //   }
  // }

  constructor() {
  const saved = localStorage.getItem('my_vibes');
  if (saved) {
    const rawData = JSON.parse(saved);
    // Convert the string timestamps back into real Date objects
    this.history = rawData.map((v: any) => ({
      ...v,
      time: new Date(v.time)
    }));
  }
}

  private saveToDisk() {
    // Helper to turn the array into a string and save it
    localStorage.setItem('my_vibes', JSON.stringify(this.history));
  }

  addVibe(mood: string, color: string) {
    this.history.unshift({ mood, color, time: new Date() });
    this.saveToDisk(); // 2. SAVE after adding
  }

  deleteVibe(index: number) {
    this.history.splice(index, 1);
    this.saveToDisk(); // 2. SAVE after deleting
  }

  clearAllVibes() {
    this.history = [];
    localStorage.removeItem('my_vibes'); // 3. WIPE storage
  }

  getHistory() {
    return this.history;
  }
}
