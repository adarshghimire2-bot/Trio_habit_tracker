import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateHabitData {
  habit_insert: Habit_Key;
}

export interface CreateHabitEntryData {
  habitEntry_insert: HabitEntry_Key;
}

export interface CreateHabitEntryVariables {
  habitId: UUIDString;
  date: DateString;
}

export interface CreateHabitVariables {
  title: string;
  frequency: string;
  description?: string | null;
}

export interface GetHabitStreaksData {
  streak?: {
    currentStreakCount: number;
    lastCompletedDate: DateString;
  };
}

export interface GetHabitStreaksVariables {
  habitId: UUIDString;
}

export interface HabitEntry_Key {
  id: UUIDString;
  __typename?: 'HabitEntry_Key';
}

export interface Habit_Key {
  id: UUIDString;
  __typename?: 'Habit_Key';
}

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

export interface Streak_Key {
  id: UUIDString;
  __typename?: 'Streak_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateHabitVariables): MutationRef<CreateHabitData, CreateHabitVariables>;
  operationName: string;
}
export const createHabitRef: CreateHabitRef;

export function createHabit(vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;
export function createHabit(dc: DataConnect, vars: CreateHabitVariables): MutationPromise<CreateHabitData, CreateHabitVariables>;

interface CreateHabitEntryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHabitEntryVariables): MutationRef<CreateHabitEntryData, CreateHabitEntryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateHabitEntryVariables): MutationRef<CreateHabitEntryData, CreateHabitEntryVariables>;
  operationName: string;
}
export const createHabitEntryRef: CreateHabitEntryRef;

export function createHabitEntry(vars: CreateHabitEntryVariables): MutationPromise<CreateHabitEntryData, CreateHabitEntryVariables>;
export function createHabitEntry(dc: DataConnect, vars: CreateHabitEntryVariables): MutationPromise<CreateHabitEntryData, CreateHabitEntryVariables>;

interface ListUserHabitsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserHabitsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserHabitsData, undefined>;
  operationName: string;
}
export const listUserHabitsRef: ListUserHabitsRef;

export function listUserHabits(options?: ExecuteQueryOptions): QueryPromise<ListUserHabitsData, undefined>;
export function listUserHabits(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserHabitsData, undefined>;

interface GetHabitStreaksRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHabitStreaksVariables): QueryRef<GetHabitStreaksData, GetHabitStreaksVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHabitStreaksVariables): QueryRef<GetHabitStreaksData, GetHabitStreaksVariables>;
  operationName: string;
}
export const getHabitStreaksRef: GetHabitStreaksRef;

export function getHabitStreaks(vars: GetHabitStreaksVariables, options?: ExecuteQueryOptions): QueryPromise<GetHabitStreaksData, GetHabitStreaksVariables>;
export function getHabitStreaks(dc: DataConnect, vars: GetHabitStreaksVariables, options?: ExecuteQueryOptions): QueryPromise<GetHabitStreaksData, GetHabitStreaksVariables>;

