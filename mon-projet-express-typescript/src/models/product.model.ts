import { Products } from '../interfaces/product.interface';

export class Product implements Products {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public description: string,
        public category: string,
        public image: string,
        public rating: { rate: number, count: number }
    ) {}
}
