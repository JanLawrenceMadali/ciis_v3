import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export default function CreateUserDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-4 py-2 text-white transition duration-300 h-9 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-950 hover:to-blue-900">
                    <UserPlus className="w-4 h-4" />
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogDescription>
                        Create a new user account.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    {/* Form fields go here */}
                </form>
            </DialogContent>
        </Dialog>
    );
}
