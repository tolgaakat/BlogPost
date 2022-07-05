import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';



const IndexScreen = ({ navigation }) => { // props navigation dan geliyor

    //  useContext  ile BlogContext içerisindeki value e erişebiliriz
    //  addBlogPost => callBack fonksiyonu Context tarafından sağlanıyor.
    //        State değişkeni (blogPosts) provider a eklendi bu sebeple bir veri 
    //        değiştiği an  Context rerender olduğundan tüm alt componentler   
    //        de rerender olur. Yani en tepede Context olduğu için ona bağlı tüm 
    //       componentler değişmiş veri ile güncellenir.

    const { state, deleteBlogPost } = useContext(Context); //Context.Provider içerisinde value kısmımna erişim

    return (<View>

        <FlatList
            data={state}
            keyExtractor={blogPost => blogPost.title}
            renderItem={({ item }) => { // item tek bir blogPost objesine karşılık gelir
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} -{item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)} >
                                <Feather style={styles.icon} name="trash" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    </View >
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;
