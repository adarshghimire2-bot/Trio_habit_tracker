# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createHabit, createHabitEntry, listUserHabits, getHabitStreaks } from '@dataconnect/generated';


// Operation CreateHabit:  For variables, look at type CreateHabitVars in ../index.d.ts
const { data } = await CreateHabit(dataConnect, createHabitVars);

// Operation CreateHabitEntry:  For variables, look at type CreateHabitEntryVars in ../index.d.ts
const { data } = await CreateHabitEntry(dataConnect, createHabitEntryVars);

// Operation ListUserHabits: 
const { data } = await ListUserHabits(dataConnect);

// Operation GetHabitStreaks:  For variables, look at type GetHabitStreaksVars in ../index.d.ts
const { data } = await GetHabitStreaks(dataConnect, getHabitStreaksVars);


```