
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  linkText: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link, linkText }) => {
  return (
    <Card className="hover-lift card-gradient">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-full bg-serenity-100 dark:bg-serenity-800 flex items-center justify-center text-serenity-600 dark:text-serenity-300">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full rounded-full">
          <Link to={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
