import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Layers,
  MoreHorizontal,
  Plus,
  Receipt,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for the chart
const chartData = {
  tooltip: {
    value: "$51,749.00",
    date: "7th Aug",
  },
}

// Mock data for the withdrawal history
const withdrawalHistory = [
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Pending" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "American Express", status: "Pending" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "American Express", status: "Pending" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Completed" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Visa", amount: "American Express", status: "Canceled" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Completed" },
  { date: "21 Sep, 2021 at 2:14 AM", method: "Mastercards", amount: "American Express", status: "Completed" },
]

// Payment methods
const paymentMethods = [
  { type: "visa", number: "4855 **** **** ****", expiry: "04/24", name: "Vako Shvili", selected: true },
  { type: "mastercard", number: "2855 **** **** ****", expiry: "04/24", name: "Vako Shvili", selected: false },
  { type: "paypal", info: "You will be redirected to the PayPal site after reviewing your order.", selected: false },
]

export default function Earning() {
  const [activeCard, setActiveCard] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0)

  const handlePaymentMethodSelect = (index) => {
    const updatedMethods = [...paymentMethods]
    updatedMethods.forEach((method, i) => {
      method.selected = i === index
    })
    setSelectedPaymentMethod(index)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center mr-4">
              <Layers className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">$13,804.00</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center mr-4">
              <Wallet className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">$16,593.00</p>
              <p className="text-sm text-muted-foreground">Current Balance</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center mr-4">
              <Receipt className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">$13,184.00</p>
              <p className="text-sm text-muted-foreground">Total Withdrawals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
              <Wallet className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">$162.00</p>
              <p className="text-sm text-muted-foreground">Today Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistics Chart */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Statistic</h3>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Revenue</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="relative h-80 w-full">
              {/* Chart would be implemented with a library like recharts */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 to-transparent rounded-lg">
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  <path
                    d="M0,100 C50,80 100,120 150,100 C200,80 250,120 300,100 C350,80 400,120 450,100 C500,80 550,120 600,100"
                    fill="none"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Tooltip */}
              <div className="absolute left-[30%] top-[30%] bg-black text-white p-2 rounded shadow-lg">
                <div className="font-bold">{chartData.tooltip.value}</div>
                <div className="text-xs">{chartData.tooltip.date}</div>
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                <div>1m</div>
                <div>500k</div>
                <div>100k</div>
                <div>50k</div>
                <div>10k</div>
                <div>1k</div>
                <div>0</div>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-4">
                <div>Aug 01</div>
                <div>Aug 10</div>
                <div>Aug 20</div>
                <div>Aug 31</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Cards</h3>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Revenue</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="relative mb-8">
              {/* Card Display */}
              <div className="bg-indigo-600 text-white rounded-lg p-6 h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-bold">VISA</div>
                  <MoreHorizontal className="h-6 w-6" />
                </div>

                <div className="text-xl font-medium mt-4">
                  4855 **** **** **** <CreditCard className="h-5 w-5 inline ml-2" />
                </div>

                <div className="flex justify-between mt-4">
                  <div>
                    <div className="text-xs text-white/70">EXPIRES</div>
                    <div>04/24</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/70">CARD NAME</div>
                    <div>Vako Shvili</div>
                  </div>
                </div>
              </div>

              {/* Card Navigation */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <div className="h-2 w-2 rounded-full bg-orange-200"></div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add New Card Button */}
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed">
              <Plus className="h-4 w-4" /> Add new card
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Withdraw Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Withdraw Your Money */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-6">Withdraw your money</h3>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Payment method:</p>

              {/* Payment Methods */}
              <div className="space-y-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border rounded-lg p-4 flex items-center justify-between cursor-pointer",
                      method.selected ? "border-green-500" : "",
                    )}
                    onClick={() => handlePaymentMethodSelect(index)}
                  >
                    <div className="flex items-center">
                      {method.type === "visa" && (
                        <div className="flex items-center">
                          <div className="bg-white border rounded p-1 mr-3">
                            <div className="text-blue-600 font-bold text-xs">VISA</div>
                          </div>
                          <div>
                            <span className="mr-4">{method.number}</span>
                            <span className="mr-4">{method.expiry}</span>
                            <span>{method.name}</span>
                          </div>
                        </div>
                      )}

                      {method.type === "mastercard" && (
                        <div className="flex items-center">
                          <div className="mr-3">
                            <div className="flex">
                              <div className="h-6 w-6 rounded-full bg-red-500 opacity-80 -mr-2"></div>
                              <div className="h-6 w-6 rounded-full bg-yellow-500 opacity-80"></div>
                            </div>
                          </div>
                          <div>
                            <span className="mr-4">{method.number}</span>
                            <span className="mr-4">{method.expiry}</span>
                            <span>{method.name}</span>
                          </div>
                        </div>
                      )}

                      {method.type === "paypal" && (
                        <div className="flex items-center">
                          <div className="mr-3 text-blue-600 font-bold">
                            <span className="text-blue-800">P</span>
                          </div>
                          <div className="text-sm text-gray-500">{method.info}</div>
                        </div>
                      )}
                    </div>

                    {method.selected && (
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-2xl font-bold">$16,593.00</div>
              <div className="text-sm text-muted-foreground mb-4">Current Balance</div>

              <Button className="bg-green-500 hover:bg-green-600 text-white px-8">Withdraw Money</Button>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw History */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-6">Withdraw History</h3>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium">DATE</TableHead>
                    <TableHead className="text-xs font-medium">METHOD</TableHead>
                    <TableHead className="text-xs font-medium">AMOUNT</TableHead>
                    <TableHead className="text-xs font-medium">STATUS</TableHead>
                    <TableHead className="text-xs font-medium"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawalHistory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm">{item.date}</TableCell>
                      <TableCell className="text-sm">{item.method}</TableCell>
                      <TableCell className="text-sm">{item.amount}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-sm px-2 py-1 rounded-md",
                            item.status === "Pending"
                              ? "text-orange-500 bg-orange-50"
                              : item.status === "Completed"
                                ? "text-green-500 bg-green-50"
                                : "text-red-500 bg-red-50",
                          )}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Cancel Withdraw</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component for dropdown icon
function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

