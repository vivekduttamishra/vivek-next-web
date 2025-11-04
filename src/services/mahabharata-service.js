import {QUESTION_CATEGORIES} from '../data/mahabharata'

class MahabharataService {
    async getCategories() {
        return QUESTION_CATEGORIES;
    }   
    
}

export default new MahabharataService();