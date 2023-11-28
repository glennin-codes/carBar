import { Request, Response } from "express";
import Car from "../../models/Car.js";

export const GetAllCars = async (req:Request, res:Response) => {
    const page: number = parseInt(req.query.page as string, 10) || 1;// Get the page number from the request query parameter
  const perPage = 50; // Number of products to show per page
  const skip = (page - 1) * perPage; // Calculate the number of documents to skip
 
  const sort:string = req.query.sort as string  || "price-desc";
  const searchQuery:string = req.query.search as string || ""; // Get the search query from the request



  // Extract minPrice and maxPrice from query parameters
  const minPrice:number = req.query.minPrice ? parseFloat(req.query.minPrice as string) : 0;
  const maxPrice:number = req.query.maxPrice
    ? parseFloat(req.query.maxPrice as string)
    : Number.MAX_VALUE;

  try {
    let query :Record<string,any>= {};

    
 

const sortOptions:Record<string,any> = {};

if (sort === 'price-asc') {
  sortOptions.price = 1; // Ascending order for price
} else if (sort === 'price-desc') {
  sortOptions.price = -1; // Descending order for price
}

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { room: { $regex: searchQuery, $options: "i" } },
        { propertyType: { $regex: searchQuery, $options: "i" } },
       
      ];
    }

    const totalItems = await Car.countDocuments(query);

   
    const cars = await Car.find(query)
      .skip(skip)
      .limit(perPage)
      .sort(sortOptions)
      .exec();

    res.status(200).json({ cars, totalItems });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};