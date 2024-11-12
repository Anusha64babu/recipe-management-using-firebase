export interface Recipe {
    id?: string;            
    name: string;           
    image: string;          
    ingredients: string[];  
    howToCook: string;      
    rating: number;        
    favorite?: boolean;     
    reviews?: string[];     
  }
  