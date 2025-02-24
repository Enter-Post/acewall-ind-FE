import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

import React from 'react'

const Account = () => {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
    </div>

    <div className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input id="firstName" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName" className="text-sm font-medium">
              Middle Name
            </Label>
            <Input id="middleName" placeholder="Enter your middle name" />
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input id="lastName" placeholder="Enter your last name" />
          </div>
        </div>

        <div className="space-y-4 sm:flex sm:justify-between sm:space-y-0 sm:space-x-4">
          <div className="space-y-2 sm:w-1/2">
            <Label className="text-sm font-medium">Preferred Pronouns</Label>
            <RadioGroup defaultValue="he/him" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["He/Him", "She/Her", "They/Them"].map((pronoun) => (
                <div key={pronoun} className="flex items-center space-x-2">
                  <RadioGroupItem value={pronoun.toLowerCase()} id={pronoun.toLowerCase()} />
                  <Label htmlFor={pronoun.toLowerCase()} className="text-sm">
                    {pronoun}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2 sm:w-1/2">
            <Label className="text-sm font-medium">Gender Identification</Label>
            <RadioGroup defaultValue="male" className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {["Male", "Female", "Non-binary", "Other"].map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <RadioGroupItem value={gender.toLowerCase()} id={gender.toLowerCase()} />
                  <Label htmlFor={gender.toLowerCase()} className="text-sm">
                    {gender}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>


      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="Enter your email address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
        </div>
      </div>


      {/* Address Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homeAddress" className="text-sm font-medium">
              Home Address
            </Label>
            <Textarea id="homeAddress" placeholder="Enter your home address" rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mailingAddress" className="text-sm font-medium">
              Mailing Address
            </Label>
            <Textarea
              id="mailingAddress"
              placeholder="Enter your mailing address (if different from home address)"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Account