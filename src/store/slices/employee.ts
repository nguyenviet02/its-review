import { create } from 'zustand';
import { IEmployee } from '@/types';

interface IEmployeeStore {
  employees: IEmployee[];
  selectedEmployee: IEmployee | null;
  setEmployees: (employees: IEmployee[]) => void;
  setSelectedEmployee: (employee: IEmployee | null) => void;
  addEmployee: (employee: IEmployee) => void;
  updateEmployee: (id: string, updatedData: Partial<IEmployee>) => void;
  removeEmployee: (id: string) => void;
}

export const useEmployeeStore = create<IEmployeeStore>((set) => ({
  employees: [],
  selectedEmployee: null,
  setEmployees: (employees) => set({ employees }),
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),
  updateEmployee: (id, updatedData) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp,
      ),
      selectedEmployee:
        state.selectedEmployee?.id === id
          ? { ...state.selectedEmployee, ...updatedData }
          : state.selectedEmployee,
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
      selectedEmployee:
        state.selectedEmployee?.id === id ? null : state.selectedEmployee,
    })),
}));
