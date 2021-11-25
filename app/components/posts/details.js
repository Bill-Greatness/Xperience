import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { constants } from '../../styles';
import testImage from '../../assets/images/_.png';
import userTest from '../../assets/images/Flier.jpg'
import Ion from 'react-native-vector-icons/Ionicons';

const Comment = () => (
  <View>
    <View style={styles.comment}>
      <View style={styles.commenter}>
        <Image style={{ width: 30, height: 30, borderRadius: 100 }} source={userTest} />
        <View style={{ paddingLeft: 3 }}>
          <Text style={styles.heading}>Anon</Text>
          <Text style={styles.date}>03/02/2021</Text>
        </View>
      </View>

    </View>
    <View style={{ paddingLeft: 45, paddingRight: 5, paddingVertical: 2 }}>
      <Text style={styles.userComment}>This is very wierd and I am hopeful you'll get through this.
        This life is really messed up. Hopefully we do not get to the top just
        to find out there is nothing there. This is very wierd and I am hopeful you'll get through this.
        This life is really messed up. Hopefully we do not get to the top just
        to find out there is nothing there</Text>
    </View>
  </View>
)
const Post = () => (
  <View>
    {[1, 2, 3, 4, 5, 6].map((pd) => (
      <View key={pd}>
        <Text style={styles.counts}>#{pd}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.postContent}>
            I would like to apply for the post as a frontend developer at
            Anatha.io as posted on Remoteok.io. I have extensive
            experience in using current technologies and frameworks to
            create mobile and web applications. I have 3+ years of
            experience in using JavaScript, React and Nodejs. I have also
            used MongoDB and Firebase for 2+ years and I am confident in
            using these technologies to create something great.
          </Text>
        </View>
      </View>
    ))}
  </View>
)

export const Details = ({ data, visible, setVisible, actionType }) => (
  <Modal
    transparent={true}
    visible={visible}
    onRequestClose={() => setVisible(false)}
    animationType="slide">
    
    <View style={constants.centeredView}>
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View style={{ backgroundColor: '#fff' }}>
          <View style={styles.headerView}>
            <View style={styles.header}>
              <Image source={testImage} style={{ width: 40, height: 40 }} />
              <View>
                <Text style={styles.postHeader}>
                  The Story I Dont Share with MySelf
                </Text>
                <Text style={styles.postSub}>Author of Post - Date Posted</Text>
              </View>
            </View>
            <View style={styles.actionRows}>
              <TouchableOpacity>
                <Ion name="md-heart" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ion name="chatbubbles" size={24} color={actionType === 'Post' ? 'black' : 'crimson'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Action type is Post */}
        {actionType === 'Post' ?
          <Post />
          : <Comment />}
      </ScrollView>
    </View>
    
  </Modal>
);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 40,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  postHeader: {
    fontWeight: '500',
    color: '#000',
    fontSize: 15,
  },
  postSub: {
    color: 'black',
    fontSize: 12,
  },
  postContent: {
    color: '#000',
    fontSize: 15,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  counts: {
    color: 'black',
    fontWeight: '800',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRows: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  userComment: {
    color: '#000'
  },
  commenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  date: {
    color: 'darkgray',
    fontSize: 10
  },
  comment: {
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  heading: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12
  }
});
