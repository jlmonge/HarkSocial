<script setup>
import FriendCard from '../components/FriendCard.vue'
import NavBar from '../components/NavBar.vue';
</script>

<template>
    <NavBar></NavBar>
    <main>
        <div id="user-info">
            <img src="../assets/placeholder.png" />
            <h2>User Name</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua.
            </p>
        </div>
        <div id="friends-container">
            <h2>My Friends</h2>
            <div id="friends-cards">
                <FriendCard></FriendCard>
                <FriendCard></FriendCard>
                <FriendCard></FriendCard>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    margin: 2vw 10vw;
}
#user-info {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
}

#user-info img {
    width: 200px;
    height: 200px;
}

#user-info p{
    margin: 10px;
}

#friends-container {
    display: flex;
    flex-direction: column;
    margin-top: 75px;
}

#friends-cards {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
</style>