import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDispatch } from "react-redux";
import { addTransaction } from "@/store/financesSlice";
import { PlusCircle, Calendar, Tag, CreditCard, Activity } from "lucide-react";
import { toast } from "sonner";

const NewTransactionDialog = ({ setOpen }) => {
    const dispatch = useDispatch()
    const [transactions, setTransactions] = useState({
        date: '',
        category: '',
        type: '',
        amount: '', 
    });

    const handleChange = (e) => {
        setTransactions({ ...transactions, [e.target.name]: e.target.value });
    }

    const handleTransaction = (e) => {
        e.preventDefault();
        
        if (!transactions.date.trim() || !transactions.category.trim() || !transactions.type || !transactions.amount) {
            toast.error("Required Fields", {
                description: "All transaction details must be provided.",
            });
            return;
        }

        if (Number(transactions.amount) <= 0) {
            toast.warning("Check Amount", {
                description: "Transaction value should be greater than zero.",
            });
            return;
        }

    
        dispatch(addTransaction({
            id: Date.now().toString(), 
            date: transactions.date.trim(),
            category: transactions.category.trim(),
            type: transactions.type.trim(),
            amount: Number(transactions.amount)
        }));

        toast.success("Record Added", {
            description: `${transactions.category.trim()} saved successfully.`
        });

        setOpen(false);
        setTransactions({ date: '', category: '', type: '', amount: '' });
    };

    return (
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#090F0C] border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6">
            
            <DialogHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                    <PlusCircle size={28} />
                </div>
                <DialogTitle className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                    New Transaction
                </DialogTitle>
                <DialogDescription className="text-zinc-500 dark:text-zinc-400 font-medium">
                    Fill out the form below to track your finance.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleTransaction} className="space-y-5 py-4">
                <div className="grid gap-4">
                    
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Calendar size={12} /> Date
                        </label>
                        <Input 
                            type="date" 
                            name="date" 
                            value={transactions.date}
                            onChange={handleChange}
                            className="bg-zinc-50 dark:bg-[#060908] border-zinc-200 dark:border-zinc-800 rounded-xl outline-none" 
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Tag size={12} /> Category
                        </label>
                        <Input 
                            type="text" 
                            name="category" 
                            value={transactions.category}
                            placeholder="Salary, Rent, Food etc." 
                            onChange={handleChange}
                            className="bg-zinc-50 dark:bg-[#060908] border-zinc-200 dark:border-zinc-800 rounded-xl outline-none" 
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Activity size={12} /> Flow
                        </label>
                        <Select value={transactions.type} onValueChange={(value) => setTransactions({ ...transactions, type: value })}>
                            <SelectTrigger className="bg-zinc-50 dark:bg-[#060908] border-zinc-200 dark:border-zinc-800 rounded-xl">
                                <SelectValue placeholder="Transaction Type" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-[#090F0C] border-zinc-800">
                                <SelectItem value="income" className="cursor-pointer">Income (+)</SelectItem>
                                <SelectItem value="expense" className="cursor-pointer">Expense (-)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <CreditCard size={12} /> Amount
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-zinc-500 font-bold text-sm">₹</span>
                            <Input 
                                type="number" 
                                name="amount" 
                                value={transactions.amount}
                                placeholder="0.00" 
                                onChange={handleChange}
                                className="pl-8 bg-zinc-50 dark:bg-[#060908] border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-lg outline-none" 
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-4">
                      <Button

                        type="submit"

                        className="w-full bg-[#0E1511] hover:bg-[#1b201d] cursor-pointer text-white font-bold py-6 rounded-xl shadow-lg dark:shadow-black/80 border border-gray-100/5 transition-all active:scale-[0.98]"

                    >
                        Save Record
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default NewTransactionDialog;