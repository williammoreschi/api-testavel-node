import BooksController from '../../../controllers/books';

describe('Controlles Books', () => {
    describe('Get All books: getAll()',()=>{
        it('shoult return list of books',()=>{
            const Books = {
                findAll: td.function()
            };

            const expectResponse = [{
                id:1,
                name:"teste 01",
                created_at:'2016-05-23T15:36:44.692Z',
                updated_at:'2016-05-23T15:36:44.692Z'
            }];

            td.when(Books.findAll({})).thenResolve(expectResponse);

            const booksControllers = new BooksController(Books);
            return booksControllers.getAll()
            .then(response => expect(response.data).to.be.eql(expectResponse));
        });
    });
});