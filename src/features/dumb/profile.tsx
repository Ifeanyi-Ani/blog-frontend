import {
  CalendarIcon,
  EnvelopeClosedIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { BookOpen, MessageSquare, ThumbsUp, UserCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Left Column - User Info */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="mx-auto h-32 w-32">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="User Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">John Doe</CardTitle>
            <p className="text-gray-500">Senior Developer</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center">
                <GlobeIcon className="mr-2 h-4 w-4" />
                <Link
                  href="https://johndoe.com"
                  className="text-blue-500 hover:underline"
                >
                  https://johndoe.com
                </Link>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Joined January 2020</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon">
                <TwitterLogoIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LinkedInLogoIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <GlobeIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Tabs */}
        <div className="space-y-6 lg:col-span-3">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsUp className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Likes</span>
                      </div>
                      <span className="font-bold">1,024</span>
                    </div>
                    <Progress value={75} className="h-2 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                        <span>Comments</span>
                      </div>
                      <span className="font-bold">482</span>
                    </div>
                    <Progress value={50} className="h-2 w-full" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Posts</span>
                      </div>
                      <span className="font-bold">76</span>
                    </div>
                    <Progress value={25} className="h-2 w-full" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                            alt="User Avatar"
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            You commented on a post
                          </p>
                          <p className="text-sm text-gray-500">
                            Great article! Thanks for sharing.
                          </p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="posts" className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>My Latest Blog Post {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Published on May 1{i}, 2023</span>
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>24</span>
                        <MessageSquare className="ml-2 h-4 w-4" />
                        <span>8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="projects" className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Project {i}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-500">
                      A brief description of Project {i}. This project aims to
                      solve X problem using Y technology.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary';
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant === 'secondary'
          ? 'bg-gray-100 text-gray-800'
          : 'bg-primary text-primary-foreground'
      }`}
    >
      {children}
    </span>
  );
}
