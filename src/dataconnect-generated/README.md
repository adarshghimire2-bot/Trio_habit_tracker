# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListUserHabits*](#listuserhabits)
  - [*GetHabitStreaks*](#gethabitstreaks)
- [**Mutations**](#mutations)
  - [*CreateHabit*](#createhabit)
  - [*CreateHabitEntry*](#createhabitentry)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUserHabits
You can execute the `ListUserHabits` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserHabits(options?: ExecuteQueryOptions): QueryPromise<ListUserHabitsData, undefined>;

interface ListUserHabitsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserHabitsData, undefined>;
}
export const listUserHabitsRef: ListUserHabitsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserHabits(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserHabitsData, undefined>;

interface ListUserHabitsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserHabitsData, undefined>;
}
export const listUserHabitsRef: ListUserHabitsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserHabitsRef:
```typescript
const name = listUserHabitsRef.operationName;
console.log(name);
```

### Variables
The `ListUserHabits` query has no variables.
### Return Type
Recall that executing the `ListUserHabits` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserHabitsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserHabitsData {
  habits: ({
    id: UUIDString;
    title: string;
    frequency: string;
    category?: {
      name: string;
    };
  } & Habit_Key)[];
}
```
### Using `ListUserHabits`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserHabits } from '@dataconnect/generated';


// Call the `listUserHabits()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserHabits();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserHabits(dataConnect);

console.log(data.habits);

// Or, you can use the `Promise` API.
listUserHabits().then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

### Using `ListUserHabits`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserHabitsRef } from '@dataconnect/generated';


// Call the `listUserHabitsRef()` function to get a reference to the query.
const ref = listUserHabitsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserHabitsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.habits);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

## GetHabitStreaks
You can execute the `GetHabitStreaks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHabitStreaks(vars: GetHabitStreaksVariables, options?: ExecuteQueryOptions): QueryPromise<GetHabitStreaksData, GetHabitStreaksVariables>;

interface GetHabitStreaksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitStreaksVariables): QueryRef<GetHabitStreaksData, GetHabitStreaksVariables>;
}
export const getHabitStreaksRef: GetHabitStreaksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHabitStreaks(dc: DataConnect, vars: GetHabitStreaksVariables, options?: ExecuteQueryOptions): QueryPromise<GetHabitStreaksData, GetHabitStreaksVariables>;

interface GetHabitStreaksRef {
  ...
  (dc: DataConnect, vars: GetHabitStreaksVariables): QueryRef<GetHabitStreaksData, GetHabitStreaksVariables>;
}
export const getHabitStreaksRef: GetHabitStreaksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHabitStreaksRef:
```typescript
const name = getHabitStreaksRef.operationName;
console.log(name);
```

### Variables
The `GetHabitStreaks` query requires an argument of type `GetHabitStreaksVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHabitStreaksVariables {
  habitId: UUIDString;
}
```
### Return Type
Recall that executing the `GetHabitStreaks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHabitStreaksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHabitStreaksData {
  streak?: {
    currentStreakCount: number;
    lastCompletedDate: DateString;
  };
}
```
### Using `GetHabitStreaks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHabitStreaks, GetHabitStreaksVariables } from '@dataconnect/generated';

// The `GetHabitStreaks` query requires an argument of type `GetHabitStreaksVariables`:
const getHabitStreaksVars: GetHabitStreaksVariables = {
  habitId: ..., 
};

// Call the `getHabitStreaks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHabitStreaks(getHabitStreaksVars);
// Variables can be defined inline as well.
const { data } = await getHabitStreaks({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHabitStreaks(dataConnect, getHabitStreaksVars);

console.log(data.streak);

// Or, you can use the `Promise` API.
getHabitStreaks(getHabitStreaksVars).then((response) => {
  const data = response.data;
  console.log(data.streak);
});
```

### Using `GetHabitStreaks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHabitStreaksRef, GetHabitStreaksVariables } from '@dataconnect/generated';

// The `GetHabitStreaks` query requires an argument of type `GetHabitStreaksVariables`:
const getHabitStreaksVars: GetHabitStreaksVariables = {
  habitId: ..., 
};

// Call the `getHabitStreaksRef()` function to get a reference to the query.
const ref = getHabitStreaksRef(getHabitStreaksVars);
// Variables can be defined inline as well.
const ref = getHabitStreaksRef({ habitId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHabitStreaksRef(dataConnect, getHabitStreaksVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.streak);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.streak);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateHabit
You can execute the `CreateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHabit(vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface CreateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
}
export const createHabitRef: CreateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHabit(dc: DataConnect, vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface CreateHabitRef {
  ...
  (dc: DataConnect, vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
}
export const createHabitRef: CreateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHabitRef:
```typescript
const name = createHabitRef.operationName;
console.log(name);
```

### Variables
The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateHabitVariables {
  title: string;
  frequency: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHabitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHabitData {
  habit_insert: Habit_Key;
}
```
### Using `CreateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHabit, CreateHabitVariables } from '@dataconnect/generated';

// The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`:
const createHabitVars: CreateHabitVariables = {
  title: ..., 
  frequency: ..., 
  description: ..., // optional
};

// Call the `createHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHabit(createHabitVars);
// Variables can be defined inline as well.
const { data } = await createHabit({ title: ..., frequency: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHabit(dataConnect, createHabitVars);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
createHabit(createHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

### Using `CreateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHabitRef, CreateHabitVariables } from '@dataconnect/generated';

// The `CreateHabit` mutation requires an argument of type `CreateHabitVariables`:
const createHabitVars: CreateHabitVariables = {
  title: ..., 
  frequency: ..., 
  description: ..., // optional
};

// Call the `createHabitRef()` function to get a reference to the mutation.
const ref = createHabitRef(createHabitVars);
// Variables can be defined inline as well.
const ref = createHabitRef({ title: ..., frequency: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHabitRef(dataConnect, createHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

## CreateHabitEntry
You can execute the `CreateHabitEntry` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHabitEntry(vars: CreateHabitEntryVariables): MutationPromise<CreateHabitEntryData, CreateHabitEntryVariables>;

interface CreateHabitEntryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitEntryVariables): MutationRef<CreateHabitEntryData, CreateHabitEntryVariables>;
}
export const createHabitEntryRef: CreateHabitEntryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHabitEntry(dc: DataConnect, vars: CreateHabitEntryVariables): MutationPromise<CreateHabitEntryData, CreateHabitEntryVariables>;

interface CreateHabitEntryRef {
  ...
  (dc: DataConnect, vars: CreateHabitEntryVariables): MutationRef<CreateHabitEntryData, CreateHabitEntryVariables>;
}
export const createHabitEntryRef: CreateHabitEntryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHabitEntryRef:
```typescript
const name = createHabitEntryRef.operationName;
console.log(name);
```

### Variables
The `CreateHabitEntry` mutation requires an argument of type `CreateHabitEntryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateHabitEntryVariables {
  habitId: UUIDString;
  date: DateString;
}
```
### Return Type
Recall that executing the `CreateHabitEntry` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHabitEntryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHabitEntryData {
  habitEntry_insert: HabitEntry_Key;
}
```
### Using `CreateHabitEntry`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHabitEntry, CreateHabitEntryVariables } from '@dataconnect/generated';

// The `CreateHabitEntry` mutation requires an argument of type `CreateHabitEntryVariables`:
const createHabitEntryVars: CreateHabitEntryVariables = {
  habitId: ..., 
  date: ..., 
};

// Call the `createHabitEntry()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHabitEntry(createHabitEntryVars);
// Variables can be defined inline as well.
const { data } = await createHabitEntry({ habitId: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHabitEntry(dataConnect, createHabitEntryVars);

console.log(data.habitEntry_insert);

// Or, you can use the `Promise` API.
createHabitEntry(createHabitEntryVars).then((response) => {
  const data = response.data;
  console.log(data.habitEntry_insert);
});
```

### Using `CreateHabitEntry`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHabitEntryRef, CreateHabitEntryVariables } from '@dataconnect/generated';

// The `CreateHabitEntry` mutation requires an argument of type `CreateHabitEntryVariables`:
const createHabitEntryVars: CreateHabitEntryVariables = {
  habitId: ..., 
  date: ..., 
};

// Call the `createHabitEntryRef()` function to get a reference to the mutation.
const ref = createHabitEntryRef(createHabitEntryVars);
// Variables can be defined inline as well.
const ref = createHabitEntryRef({ habitId: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHabitEntryRef(dataConnect, createHabitEntryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habitEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habitEntry_insert);
});
```

