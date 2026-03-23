# Add React Component

Create a React component following VicertHR frontend patterns.

**Component for:** $ARGUMENTS

## Requirements

### 1. Create Component File

Location: `src/frontend/src/components/{ComponentName}.tsx`

```tsx
import { useState } from 'react';
import { useDataLoader } from '../hooks/useDataLoader';
import { useFormHandler } from '../hooks/useFormHandler';

interface [ComponentName]Props {
  // Define props with TypeScript types
  id?: number;
  onSuccess?: () => void;
}

export function [ComponentName]({ id, onSuccess }: [ComponentName]Props) {
  // State management
  const [isOpen, setIsOpen] = useState(false);

  // Data fetching with useDataLoader
  const { data, loading, error, refetch } = useDataLoader(
    () => api.get[Entity](id),
    [id]
  );

  // Handle loading state
  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-md">
        {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Component content */}
    </div>
  );
}
```

### 2. For Forms, Use useFormHandler

```tsx
import { useFormHandler } from '../hooks/useFormHandler';

interface FormData {
  name: string;
  email: string;
}

export function [ComponentName]Form({ onSuccess }: { onSuccess?: () => void }) {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormHandler<FormData>({
    initialValues: {
      name: '',
      email: '',
    },
    validate: (values) => {
      const errors: Partial<FormData> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      return errors;
    },
    onSubmit: async (values) => {
      await api.create[Entity](values);
      onSuccess?.();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent
                   bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                   hover:bg-blue-700 focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

## Styling Guidelines

**Use Tailwind CSS only** - No inline styles or custom CSS files.

Common patterns:
```tsx
// Container
<div className="bg-white shadow rounded-lg p-6">

// Form input
<input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                  focus:border-blue-500 focus:ring-blue-500" />

// Primary button
<button className="inline-flex justify-center rounded-md border border-transparent
                   bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                   hover:bg-blue-700 disabled:opacity-50">

// Error message
<p className="mt-1 text-sm text-red-600">

// Loading state
<div className="animate-pulse">
```

## Component Guidelines

1. **Keep components < 300 lines** - Extract logic to hooks if larger
2. **Use TypeScript interfaces** for all props
3. **No `any` types** - Type everything properly
4. **Use custom hooks**:
   - `useDataLoader` for data fetching
   - `useFormHandler` for forms
5. **Handle all states**: loading, error, empty, success
6. **Tailwind only** - No inline styles

## Folder Structure

For larger features, organize as:
```
src/frontend/src/components/
├── [Feature]/
│   ├── [Feature]List.tsx
│   ├── [Feature]Form.tsx
│   ├── [Feature]Details.tsx
│   └── index.ts          # Re-exports
```

## Output Checklist

After creating the component:
1. [ ] Component created with TypeScript interfaces
2. [ ] Uses appropriate hooks (useDataLoader/useFormHandler)
3. [ ] Handles loading, error, and empty states
4. [ ] Uses Tailwind CSS for all styling
5. [ ] Component < 300 lines
6. [ ] No `any` types
7. [ ] Run `npm run build` to verify compilation
