import { User } from "lucide-react"

export const Account = ()=> {
  return (
                        <div className="flex gap-2 items-center">
                            <User className="w-8 h-8" />
                            <div className="flex flex-col">
                                <h5 className="font-bold">Ifeanyi Ani</h5>
                                <p className="text-xs text-stone-400">
                                    software developer
                                </p>
                            </div>
                        </div>
  )
}
