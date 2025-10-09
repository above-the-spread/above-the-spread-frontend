import { Home } from "lucide-react";
import React from "react";

// Type for menu items
export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<any> | string;
  iconProps?: any;
}

// Menu items for sports application
export const mainItems: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

// European Tournaments
export const tournaments: MenuItem[] = [
  {
    title: "Champions League",
    url: "#",
    icon: "/images/champion.png",
  },
  {
    title: "Europa League",
    url: "#",
    icon: "/images/europa.png",
  },
  {
    title: "Europa Conference League",
    url: "#",
    icon: "/images/conference.png",
  },
];

// Top 5 European Leagues
export const leagues: MenuItem[] = [
  {
    title: "Premier League",
    url: "#",
    icon: "/images/premier.png",
  },
  {
    title: "La Liga",
    url: "#",
    icon: "/images/laliga.png",
  },
  {
    title: "Bundesliga",
    url: "#",
    icon: "/images/bundesliga.png",
  },
  {
    title: "Serie A",
    url: "#",
    icon: "/images/seriea.png",
  },
  {
    title: "Ligue 1",
    url: "#",
    icon: "/images/ligue1.png",
  },
];
