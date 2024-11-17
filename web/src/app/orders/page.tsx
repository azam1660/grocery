"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "@/services/api";
import { Package, Truck, CheckCircle, AlertCircle } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  status: string;
  totalAmount: number;
}

const statusIcons = {
  pending: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  prepared: <Package className="h-4 w-4 text-blue-500" />,
  "in transit": <Truck className="h-4 w-4 text-purple-500" />,
  delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.put(`/orders/${id}`, { status });
      setOrders(
        orders.map((order) => (order.id === id ? { ...order, status } : order))
      );
      toast({
        title: "Success",
        description: `Order status updated to ${status}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-black">
          Orders Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Customer</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-[#fffaef] transition-colors"
                  >
                    <TableCell className="font-medium">
                      {order.customer}
                    </TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusIcons).map(([status, icon]) => (
                            <SelectItem key={status} value={status}>
                              <div className="flex items-center">
                                {icon}
                                <span className="ml-2 capitalize">
                                  {status}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() =>
                          handleStatusChange(order.id, "delivered")
                        }
                        className="bg-[#3bff90] text-black hover:bg-[#3bff90]/90 transition-colors"
                      >
                        Mark as Delivered
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
