import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import React from "react";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
      <div className="space-y-8 flex justify-center items-center">
        {/* Personal Information */}
        <div className="space-y-6 w-full md:w-[50%]">
          <div className="">
            <h2 className="text-2xl font-bold text-foreground">Support</h2>
          </div>
          <div className="flex flex-col gap-5">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-sm font-medium">
                Full Name
              </Label>
              <Input id="firstName" placeholder="Enter your  Full Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type={"email"}
                placeholder="Enter your Email"
              />
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="feedback" className="text-sm font-medium">
                Feedback
              </Label>
              <Textarea id="feedback" placeholder="feedback" />
            </div>
            <div>
              <Button className={"bg-green-400 hover:bg-green-500"}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
