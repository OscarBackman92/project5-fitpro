# Testing Documentation

## Frontend Testing

### Setup Testing Environment
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Running Tests
```bash
npm test
```

### Component Testing Example
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('submits username and password', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });
});
```

### Integration Testing Example
```javascript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkoutHistory from './WorkoutHistory';

test('loads and displays workouts', async () => {
  render(<WorkoutHistory />);
  
  // Check loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for workouts to load
  await waitFor(() => {
    expect(screen.getByText(/my workouts/i)).toBeInTheDocument();
  });
  
  // Check workout list
  expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 workouts
});
```

## End-to-End Testing

### Setup Cypress
```bash
npm install --save-dev cypress
```

### Example Cypress Test
```javascript
describe('Workout Tracking', () => {
  beforeEach(() => {
    cy.login('testuser', 'password123');
  });

  it('can create a new workout', () => {
    cy.visit('/workouts/new');
    cy.get('[name=workout_type]').select('cardio');
    cy.get('[name=duration]').type('30');
    cy.get('[name=intensity]').select('moderate');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/workouts');
    cy.contains('Workout saved successfully');
  });
});
```