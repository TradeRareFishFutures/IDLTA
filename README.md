<div align="center">
  <h1>💔 IDLTA</h1>
  <p><b>I Don't Like That Anymore</b></p>
  **Want to remove your likes on Instagram? Hide your embarrassing likes!** IDLTA is a very simple userscript. 
</div>

---

<div align="center">
  
<img width="295" height="251" alt="image" src="https://github.com/user-attachments/assets/b6961e48-6b3b-4ccc-b5ab-d7cb862a8d51" />

  
<h3>⚠️<b>WARNING:</b> This might be against Instagram/Meta's TOS! I didn't read it so I don't know, and don't care. </h3>


</div>


---

## Usage

1. Go to Instagram on your desktop browser.
2. Navigate to your Likes page:
   - Go to **Menu &gt; Your Activity &gt; Interactions &gt; Likes**
   - Or click this direct link* [instagram.com/your_activity/interactions/likes/](https://www.instagram.com/your_activity/interactions/likes/)
3. Open your browser's inspect element or adjacent and navigate to 'console'
4. **Copy** the entire contents of `unlike.js`.
5. **Paste** the code into the console and press **Enter**.
6. Adjust settings to your liking (depending on internet speed, risk level, etc)

---

## Configuration

You can customize the script's behavior in the panel:

| Setting | Description | Default |
| --- | --- | --- |
| **Batch Size** | How many posts to select and unlike at once before resting. | `10` |
| **Min Delay (s)** | The minimum wait time between batches. | `15` |
| **Max Delay (s)** | The maximum wait time between batches. | `25` |

---

## ⚠️ USE THIS AT YOUR OWN RISK! ⚠️
This tool is meant for personal use at small scale. Unliking too many posts at once or having the delay too low may get you ratelimited, banned, shadowbanned, or otherwise.

I have implemented a very rudimentary fail-safe that will reload the page (which stops the script from running) when there is an abnormally long loading time, which is a sign of ratelimiting.
#### I am not affiliated with or endorsed by Instagram or Meta.
