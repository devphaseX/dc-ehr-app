import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import React from 'react';

type Props = {
  data: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    role: 'owner' | 'contributor';
  };
};

export const ContributorCard = ({
  data: { id, fullName, avatarUrl, email, role },
}: Props) => {
  return (
    <Card className="border-none p-0 shadow-none flex gap-x-4">
      <CardHeader className="p-0">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} alt="avatar" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex items-center justify-between">
        <div className="space-y-1">
          <div>
            <h6 className="font-bold text-black text-sm">{fullName}</h6>
          </div>
          <p className="text-xs text-neutral-500">{email}</p>
        </div>

        <div className="flex items-center gap-x-4">
          {role !== 'owner' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2.5 w-fit h-fit flex items-center gap-x-2 text-neutral-800 font-medium border-neutral-200 rounded-[40px]"
                >
                  Can edit
                  <ChevronDown className="size-5" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          )}

          <Button
            className="w-fit h-fit py-2.5 px-5 border-none
              rounded-[40px] text-white bg-primary-500 font-bold"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
