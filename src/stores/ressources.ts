import { defineStore } from "pinia";
import type { Money, Memory } from '@/interfaces/ressource.interface'

interface Memories {
    [name: string]: Memory;
}

interface RessourceInventory {
    money: Money;
    memories: Memories;
}
