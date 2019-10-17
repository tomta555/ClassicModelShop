# ClassicModelShop

## วิธีใช้งาน WebSql Database
1. เปิดหน้าเว็บด้วย live-server (คลิกขวา Open with Live Server) เพื่อให้ Google Chorme สร้าง Database ใหม่
2. Show file extension โดยกดที่แถบ view บน file explorer แล้วติ๊กถูกตรง File name extensions 
(ไม่รู้ว่า file explorer คืออะไร กด Windows Key + E)
3. Copy ClassicModelShop.db ไปไว้ที่ 
- C:\Users\\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\databases\http_127.0.0.1_5500
- (ไม่รู้ว่าไปยังไงก็ Copy ไปวางในช่อง Address หรือ กด Windows Key + R แล้ววางในช่อง กด OK)
4. จะมีไฟล์ ชื่อเป็น [ตัวเลข] ไม่มีนามสกุล ให้แทนที่ไฟล์นี้ด้วย ClassicModelShop.db ด้วยโดยให้เปลี่ยนชื่อจาก ClassicModelShop.db เป็น [ตัวเลข] นั้น แล้วลบ .db ออกด้วย
5. Refresh หน้าเว็บที่เปิดไว้ จะได้ข้อมูลจาก Database ใหม่

**ถ้าไฟล์ ClassicModelShop.db มีการเปลี่ยนแปลง**
- Pull งานลงไปใหม่ (ใช้คำสั่ง git pull)

**ถ้าเปิดหน้า index.html ด้วย Live-server แล้ว Product มันบัคโหลดไม่ขึ้น** 
- ให้กด Refresh ซัก 1 ครั้ง 
- ถ้ายังไม่ขึ้นอีก ให้กด Ctrl + Shift + R