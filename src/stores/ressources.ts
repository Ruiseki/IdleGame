import { defineStore } from "pinia";
import type { Money, Memory } from '@/interfaces/ressource.interface'

export interface Memories {
    [name: string]: Memory;
}

export interface RessourceInventory {
    money: Money;
    memories: Memories;
}
