import { Injectable } from '@angular/core';

const STACK_KEY = 'linkStack';

@Injectable({
  providedIn: 'root'
})
export class LinkStackService {

  private getStack(): string[] {
    const raw = localStorage.getItem(STACK_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveStack(stack: string[]): void {
    localStorage.setItem(STACK_KEY, JSON.stringify(stack));
  }

  pushLink(link: string): void {
    const stack = this.getStack();
    stack.push(link);
    this.saveStack(stack);
  }

  popLink(): string | undefined {
    const stack = this.getStack();
    const last = stack.pop();
    this.saveStack(stack);
    return last;
  }

  peekLink(): string | undefined {
    const stack = this.getStack();
    return stack[stack.length - 1];
  }

  getStackObject(): string[] {
    return this.getStack();
  }

  clear(): void {
    localStorage.removeItem(STACK_KEY);
  }
}
