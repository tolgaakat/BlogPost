import createDataContext from "./createDataContext";

/*
createDataContext e parametre olarak geçiyor.
Aşağıdaki addBlogPost ve deleteBlogPost tarafından çağırılıyor. Ama dolaylı
    yoldan. Bu fonksiyonlarda kullanılan "dispatch" reducer tanımında kullanılıyor. State'i değiştiren fonksiyonlar olarak tanımlanıyorlar.
    Dikkat edersek  addBlogPost ve deleteBlogPost da  createDataContext e parametre olarak geçmiş. Bunlar "Provider" içerisinde "boundActions" array ine ekleniyor ve
    alt componentlere callBack fonksiyonu olarak gönderiliyor. 
    Alt componentlere hem veri gönderiliyor => state
    hem de bunları manupule edebilecek callBack fonksiyonları gönderiliyor =>     boundActions
    Bu alt compomentler içerisinde, mesela IndexScreen.js içerisinde bu state verisinde bir değişiklik olursa "reducer" özelliği sayesinde reducer'ın bağlı olduğu component
    rerender olur. reducer da Provider altında tanımlı olduğundan önce Provider sonra 
    altında bulunan tüm componentler render olur. State de değiştiğinden componentler refresh olduğunda yeni veriyi gösterecekler.

    Yeni bir resource type eklenecekse önce reducer tanımla , sonra callBack fonksiyonları oluştur. Sonra "createDataContext" i çağırarak dinamik "Context"
    oluştur.
*/

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload)
        case 'add_blogpost':
            return [...state, {
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];
        default:
            return state;
    }

};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        callback();
    }
};


const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id });
    }
};

export const { Context, Provider } =
    createDataContext(
        blogReducer,
        {
            addBlogPost,
            deleteBlogPost
        },
        []);

