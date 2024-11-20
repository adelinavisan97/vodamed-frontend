interface MedicineDbModel {
    _id?: string;
    name: string;
    description?: string;
    dosage: string;
    sideEffects?: string[];
    price: number;
    stock: number;
    type: "prescription" | "over-the-counter";
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Medicine {
    medicine: string;
    dosage: string;
    quantity: number;
}

interface Prescription {
    id: string;
    patient: string;
    doctor: string;
    medicines: Medicine[];
    prescriptionDate: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}
