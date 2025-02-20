import { Request, Response } from 'express';
import Cake, { ICake } from '../models/cake.model';

// Get all cakes
export const getAllCakes = async (req: Request, res: Response): Promise<void> => {
  try {
    // For the list view, we only need id, name and imageUrl
    const cakes = await Cake.find({}, 'name imageUrl').sort({ createdAt: -1 });
    res.status(200).json(cakes);
  } catch (error) {
    console.error('Error fetching cakes:', error);
    res.status(500).json({ message: 'Server error while fetching cakes' });
  }
};

// Get a single cake by ID
export const getCakeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cake = await Cake.findById(id);
    
    if (!cake) {
      res.status(404).json({ message: 'Cake not found' });
      return;
    }
    
    res.status(200).json(cake);
  } catch (error) {
    console.error('Error fetching cake by ID:', error);
    res.status(500).json({ message: 'Server error while fetching cake' });
  }
};

// Create a new cake
export const createCake = async (req: Request, res: Response): Promise<void> => {
  try {
    const cakeData: ICake = req.body;
    
    // Check for existing cake with same name (case insensitive)
    const existingCake = await Cake.findOne({
      name: { $regex: new RegExp(`^${cakeData.name}$`, 'i') }
    });
    
    if (existingCake) {
      res.status(409).json({ 
        message: 'A cake with this name already exists',
        field: 'name'
      });
      return;
    }
    
    const newCake = new Cake(cakeData);
    const savedCake = await newCake.save();
    
    res.status(201).json(savedCake);
  } // Update your catch blocks like this:
  catch (error: unknown) {
    console.error('Error creating cake:', error);
    
    // Type narrowing - check if error is an object with a name property
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      // Now TypeScript knows this is a ValidationError object
      const validationError = error as unknown as { errors: Record<string, { path: string, message: string }> };
      const validationErrors = Object.values(validationError.errors).map((err) => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).json({ errors: validationErrors });
      return;
    }
    
    res.status(500).json({ message: 'Server error while creating cake' });
  }
};

// Update a cake
export const updateCake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: Partial<ICake> = req.body;
    
    // Check if updating the name would conflict with an existing cake
    if (updateData.name) {
      const existingCake = await Cake.findOne({
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: id }
      });
      
      if (existingCake) {
        res.status(409).json({
          message: 'A cake with this name already exists',
          field: 'name'
        });
        return;
      }
    }
    
    const updatedCake = await Cake.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedCake) {
      res.status(404).json({ message: 'Cake not found' });
      return;
    }
    
    res.status(200).json(updatedCake);
  } // Update your catch blocks like this:
  catch (error: unknown) {
    console.error('Error creating cake:', error);
    
    // Type narrowing - check if error is an object with a name property
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      // Now TypeScript knows this is a ValidationError object
      const validationError = error as unknown as { errors: Record<string, { path: string, message: string }> };
      const validationErrors = Object.values(validationError.errors).map((err) => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).json({ errors: validationErrors });
      return;
    }
    
    res.status(500).json({ message: 'Server error while creating cake' });
  }
};

// Delete a cake
export const deleteCake = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCake = await Cake.findByIdAndDelete(id);
    
    if (!deletedCake) {
      res.status(404).json({ message: 'Cake not found' });
      return;
    }
    
    res.status(200).json({ message: 'Cake deleted successfully' });
  } catch (error) {
    console.error('Error deleting cake:', error);
    res.status(500).json({ message: 'Server error while deleting cake' });
  }
};