-- MariaDB dump 10.19  Distrib 10.4.20-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: to_say_db
-- ------------------------------------------------------
-- Server version	10.4.20-MariaDB-alt1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Token',6,'add_token'),(22,'Can change Token',6,'change_token'),(23,'Can delete Token',6,'delete_token'),(24,'Can view Token',6,'view_token'),(25,'Can add token',7,'add_tokenproxy'),(26,'Can change token',7,'change_tokenproxy'),(27,'Can delete token',7,'delete_tokenproxy'),(28,'Can view token',7,'view_tokenproxy'),(29,'Can add user',8,'add_user'),(30,'Can change user',8,'change_user'),(31,'Can delete user',8,'delete_user'),(32,'Can view user',8,'view_user'),(33,'Can add api stat',9,'add_apistat'),(34,'Can change api stat',9,'change_apistat'),(35,'Can delete api stat',9,'delete_apistat'),(36,'Can view api stat',9,'view_apistat'),(37,'Can add desk',10,'add_desk'),(38,'Can change desk',10,'change_desk'),(39,'Can delete desk',10,'delete_desk'),(40,'Can view desk',10,'view_desk'),(41,'Can add card',11,'add_card'),(42,'Can change card',11,'change_card'),(43,'Can delete card',11,'delete_card'),(44,'Can view card',11,'view_card'),(45,'Can add learning progress',12,'add_learningprogress'),(46,'Can change learning progress',12,'change_learningprogress'),(47,'Can delete learning progress',12,'delete_learningprogress'),(48,'Can view learning progress',12,'view_learningprogress');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cards` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `side_one` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `side_two` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desk_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cards_desk_id_96abb1b7_fk_desks_id` (`desk_id`),
  CONSTRAINT `cards_desk_id_96abb1b7_fk_desks_id` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1058 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,'you had better do something (I\'d better)','тебе бы лучше сделать что-то','1.mp3',1),(2,'I should do it = I ought to do it','мне следует это сделать','2.mp3',1),(3,'You might want to do it = You need to do it = It\'s a good idea','Это хорошая идея','3.mp3',1),(4,'I\'m going to have to do something about it','я собираюсь с этим что-то сделать','4.mp3',1),(5,'I\'ve got to','я должен','5.mp3',1),(6,'I\'d rather do something = I would rather do something','я бы скорее предпочел сделать что-то','6.mp3',1),(7,'I would rather not do something','я бы предпочел не делать  что-то','7.mp3',1),(8,'to make a comment','сделать комментарий','8.mp3',1),(9,'to make up one\'s mind','Определиться','9.mp3',1),(10,'to make a decision','принять решение','10.mp3',1),(11,'to make a bed','стелить постель','11.mp3',1),(12,'abully','хулиган','12.mp3',1),(13,'to mention','Упомянуть','13.mp3',1),(14,'a reservation','бронирование','14.mp3',1),(15,'to do some research','исследовать что-то','15.mp3',1),(16,'to do some good','приносить пользу','16.mp3',1),(17,'to do my best','сделать все возможное ','17.mp3',1),(18,'to do the talking','Разговаривать, обсуждать','18.mp3',1),(19,'to do the thinking','Обдумывать','19.mp3',1),(20,'to do the math','Заниматься рассчетами','20.mp3',1),(21,'to make a living','зарабатывать на жизнь ','21.mp3',1),(22,'to make excuses','оправдываться ','22.mp3',1),(23,'to make a difference','Изменить ситуацию','23.mp3',1),(24,'to make a mistake','сделать ошибку ','24.mp3',1),(25,'to make fun of','высмеивать ','25.mp3',1),(26,'to make sense','придавать смысл ','26.mp3',1),(27,'to make an impression','Произвести впечатление','27.mp3',1),(28,'to make an effort','приложить усилия ','28.mp3',1),(29,'to make sure','убедиться','29.mp3',1),(30,'I\'d better go. Can I call you back?','Я, пожалуй, пойду. Могу я тебе перезвонить? ','30.mp3',1),(31,'I’ve got to get going.','Я должен идти.','31.mp3',1),(32,'I’m going to have to run.','мне пора бежать. (я собираюсь бежать)','32.mp3',1),(33,'I’ve really got to go.','я действительно должен идти','33.mp3',1),(34,'assertive','настойчивый','34.mp3',1),(35,'assertiveness','настойчивость','35.mp3',1),(36,'unless = if not','если нет','36.mp3',1),(37,'there is no point = it makes no sens','это не имеет смысла','37.mp3',1),(38,'to be worth smt','стоить чего-то','38.mp3',1),(39,'provided that = as long that','только если','39.mp3',1),(40,'to come up','появлятся','40.mp3',1),(41,'ever','когда-либо','41.mp3',1),(42,'credit = responsibility','ответственность','42.mp3',1),(43,'To back for anything','заступался за что-то','43.mp3',1),(44,'as I see it','так как я считаю нужным','44.mp3',1),(45,'From out of nowhere','откуда не возьмись','45.mp3',1),(46,'didn\'t say a words about smt','не сказал не словечка об этом','46.mp3',1),(47,'To be going downhill','Пойти под откос','47.mp3',1),(48,'it doesn\'t make any differnce','это ничего не меняет (о ситуации)','48.mp3',1),(49,'make a difference','улучшить ситуацию','49.mp3',1),(50,'To make a  good impression on','Произвести хорошее впечатление на','50.mp3',1),(51,'make an effort','сделать усилие','51.mp3',1),(52,'make fun of someone','подшучивать на кем-то','52.mp3',1),(53,'appropriate','подходящий','53.mp3',1),(54,'parents','родители','54.mp3',2),(55,'father (dad)','Отец (папа)','55.mp3',2),(56,'mother (mom)','Мать (мама)','56.mp3',2),(57,'grandparents','Бабушка и дедушка','57.mp3',2),(58,'grandfather (grandpa)','Дедушка (дедушка)','58.mp3',2),(59,'brother','Брат','59.mp3',2),(60,'grandmother (grandma)','Бабушка (бабушка)','60.mp3',2),(61,'husband','муж','61.mp3',2),(62,'wife','Жена','62.mp3',2),(63,'children (kids)','Дети (дети)','63.mp3',2),(64,'son','сын','64.mp3',2),(65,'daughter','дочь','65.mp3',2),(66,'sister','сестра ','66.mp3',2),(67,'aunt','тетя ','67.mp3',2),(68,'uncle','дядя ','68.mp3',2),(69,'cousin','двоюродная сестра ','69.mp3',2),(70,'relatives','родные ','70.mp3',2),(71,'family','семья ','71.mp3',2),(72,'to take a class','Заниматься, брать урок','72.mp3',2),(73,'to clean the house','Прибраться дома','73.mp3',2),(74,'to play sports','играть в спортивную игру','74.mp3',2),(75,'to play soccer','играть в футбол ','75.mp3',2),(76,'to play on a sports team','играть в спортивной команде','76.mp3',2),(77,'to go shopping','ходить по магазинам ','77.mp3',2),(78,'to do the laundry','постирать ','78.mp3',2),(79,'to make phone calls,','Совершать телефонные звонки,','79.mp3',2),(80,'to call smb','позвонить SMB ','80.mp3',2),(81,'to meet smb','встретить SMB ','81.mp3',2),(82,'to go to bed','идти спать ','82.mp3',2),(83,'to eat a snack','съесть закуску ','83.mp3',2),(84,'morning routine','утренняя рутина ','84.mp3',2),(85,'together','все вместе ','85.mp3',2),(86,'late','поздно ','86.mp3',2),(87,'early','рано ','87.mp3',2),(88,'suddenly','вдруг, внезапно','88.mp3',3),(89,'immediately','немедленно','89.mp3',3),(90,'particular','специфически, конкретный','90.mp3',3),(91,'to turn out smt','обернутся чем-то','91.mp3',3),(92,'it work out','Это работает','92.mp3',3),(93,'to write back','ответить на сообщение','93.mp3',3),(94,'to get back','вернуться','94.mp3',3),(95,'to ask smb out','пригласить','95.mp3',3),(96,'to break up','расстаться','96.mp3',3),(97,'to get devorse.','Развестись','97.mp3',3),(98,'to settle down','Остепениться','98.mp3',3),(99,'We passed through a lot together','мы через многое прошли вместе','99.mp3',3),(100,'to refer','ссылаться','100.mp3',3),(101,'penultimate','предпоследний','101.mp3',3),(102,'To move away','Уехать','102.mp3',3),(103,'Furthermore = moreover','Кроме того, более того','103.mp3',3),(104,'Eligible','Идеальный, подходящий партнер','104.mp3',3),(105,'Initial','Первоначально, в начале','105.mp3',3),(106,'To disappear','Исчезнуть','106.mp3',3),(107,'To reveal','Раскрыть, разоблачить','107.mp3',3),(108,'Evidence','Доказательства','108.mp3',3),(109,'To vary','Варьироваться отличаться друг от друга','109.mp3',3),(110,'A circle of friends','Круг друзей','110.mp3',3),(111,'To contribute (to)','Вносить вклад (в)','111.mp3',3),(112,'It appears = it seems','Похоже, это кажется','112.mp3',3),(113,'Former','Бывший','113.mp3',3),(114,'To delay','Задержать, отложить','114.mp3',3),(115,'To provide','Предоставить, обеспечить','115.mp3',3),(116,'Increasingly','все больше и больше','116.mp3',3),(117,'An encounter','случайная встреча','117.mp3',3),(118,'To trust','Доверять','118.mp3',3),(119,'crowd','толпа, тусовка','119.mp3',3),(120,'To attend','посещать','120.mp3',3),(121,'they would get together','они стали встречаться','121.mp3',3),(122,'no one seemed right','Никто не казался подходящим','122.mp3',3),(123,'happily ever after','долго и счастливо','123.mp3',3),(124,'that suit your best','что вам лучше подходит','124.mp3',3),(125,'by chance','случайно','125.mp3',3),(126,'to fall for smb = to fall in love with somebody','влюбиться','126.mp3',3),(127,'But the long-distance relationship did not work out','Но отношения на расстоянии не сработали','127.mp3',3),(128,'A blind date','свидание в слепую','128.mp3',3),(129,'there are less chances = it\'s less likely','Есть меньше шансов','129.mp3',3),(130,'You will learn something new','Вы узнаете что-то новое','130.mp3',3),(131,'can\'t last long','не может длиться долго','131.mp3',3),(132,'odd = strange','странный','132.mp3',3),(133,'in away','в некотором смысле','133.mp3',3),(134,'sort of = kind of','Типо того','134.mp3',3),(135,'in a way','в некотором смысле','135.mp3',3),(136,'irritating','раздражающий','136.mp3',3),(137,'i can eat boiled eggs or scrambled eggs','Я могу есть вареные яйца или яичницу','137.mp3',3),(138,'otherwis','иначе','138.mp3',3),(139,'instead','вместо','139.mp3',3),(140,'way to go','молодец / так держать / способ','140.mp3',3),(141,'to be considered','считается, рассматривается','141.mp3',3),(142,'I consider that','Я считаю что...','142.mp3',3),(143,'acceptable','приемлемо','143.mp3',3),(144,'to couse','быть причиной чего-то, вызывать проблему','144.mp3',4),(145,'Wealth','Богатство','145.mp3',4),(146,'A loan','Заем','146.mp3',4),(147,'To pay off','Расплатиться','147.mp3',4),(148,'To commute','Смягчать','148.mp3',4),(149,'Confidence','Уверенность','149.mp3',4),(150,'Spill','Проливать','150.mp3',4),(151,'To worry about something','Беспокоиться о чем-то','151.mp3',4),(152,'To thank for','Поблагодарить за','152.mp3',4),(153,'To share','Делиться','153.mp3',4),(154,'To get rid of','Избавиться','154.mp3',4),(155,'Laughter','Смех','155.mp3',4),(156,'A grad school','Аспирантура','156.mp3',4),(157,'Handwritten','Рукописный','157.mp3',4),(158,'A scholarship','Стипендия','158.mp3',4),(159,'To matter','Иметь значение','159.mp3',4),(160,'Imaginary','Воображаемый','160.mp3',4),(161,'To get upset','Расстроиться','161.mp3',4),(162,'I consider','я полагаю','162.mp3',4),(163,'Barefoot','Босиком','163.mp3',4),(164,'To get to know','узнать','164.mp3',4),(165,'To take each day as it comes','жить сегодняшним днем','165.mp3',4),(166,'I just wish','Я просто хочу','166.mp3',4),(167,'wish you were here','Хотелось бы, чтобы ты был здесь','167.mp3',4),(168,'She would travel all over the world if she were rich','Она бы путешествовавала по всему миру, если бы она была богата','168.mp3',4),(169,'She would pass the exam if she ever studied','Она бы сдала экзамен, если бы готовилась','169.mp3',4),(170,'Have a look at the examples:','Посмотрите на примеры:','170.mp3',4),(171,'If I were you, I wouldn\'t go out with that man.','На твоем месте, я бы никуда с ним не пошла','171.mp3',4),(172,'she lives far away','Она живет далеко','172.mp3',4),(173,'she wishes, she did not live so far away','Она хотела бы жить не так далеко','173.mp3',4),(174,'loan','заем','174.mp3',4),(175,'be grateful for','быть благодарным','175.mp3',4),(176,'to get distracted','отвлечься','177.mp3',4),(177,'to borrow smt from smb','одолжить что-то у кого-то','178.mp3',4),(178,'to appologises for','извиняться','179.mp3',4),(179,'to climb','карабкаться','180.mp3',4),(180,'Congratulations','Поздравляем','181.mp3',4),(181,'Awesome','Потрясающие','182.mp3',4),(182,'A tough decision','трудное решение','183.mp3',4),(183,'to hurry','торопиться','184.mp3',4),(184,'concentrate on smth','сосредоточиться на Smth','185.mp3',4),(185,'warn smb about smth','предупреждать кого-либо о чем либо','186.mp3',4),(186,'worry about smth','беспокоиться о чем-то','187.mp3',4),(187,'Forgive smb for smth','Простить кого-то за что-то','188.mp3',4),(188,'graduate from university','выпуститься из университета ','189.mp3',4),(189,'lend smth to  smb','одолжить кому-то что-то','190.mp3',4),(190,'Provide smb with smth','Обеспечить  кого-то чем-то','191.mp3',4),(191,'relyon smb','положиться на кого-то','192.mp3',4),(192,'congratulate smb on smth','поздравить кого-то с чем-то','193.mp3',4),(193,'consist of smth','состоять из чего-то','194.mp3',4),(194,'depend on  smth','зависит от Smth','195.mp3',4),(195,'To talk to smb about smth','Поговорить с кем-то о чем-то','196.mp3',4),(196,'wait for smth','ждать чего-то','197.mp3',4),(197,'brag about smth','хвастаться по поводу чего-то','198.mp3',4),(198,'buy smth for  smb','Купить что-то для кого-то','199.mp3',4),(199,'spend money on smb','тратить деньги на кого-то','200.mp3',4),(200,'succeed in smth doing smth','преуспеть в чем-то','201.mp3',4),(201,'apologize to smb for smth','извиниться перед кем-то за что-то','202.mp3',4),(202,'ask smb about smth','Спросить кого-то о чем-то','',4),(203,'care about smth','заботиться о чем-то','',4),(204,'complain to  smb  about smth','пожаловаться кому-то о чем-то','205.mp3',4),(205,'To say smth to smb','Сказать что-то кому-то','206.mp3',4),(206,'shout at smb','кричать на кого-то','207.mp3',4),(207,'apply for smth','Подать заявку на что-то','208.mp3',4),(208,'believe in  smth','верить во что-то','209.mp3',4),(209,'belong to  smb','принадлежать кому-то','210.mp3',4),(210,'happen to','случилось с ','211.mp3',4),(211,'insiston smth','находятся в наличии ','212.mp3',4),(212,'introduce smb to smb else','Представить кого-то кому-то','213.mp3',4),(213,'laugh at smth','Смеяться над чем-то','214.mp3',4),(214,'listen to smth','слушать что-то','215.mp3',4),(215,'blame smth on smb','винить в чем-то кого-то','216.mp3',4),(216,'suffer from smth','страдать от чего-то','217.mp3',4),(217,'to agree whith smb on smth','согласиться с кем-то на что-то','218.mp3',4),(218,'pine forest','Сосновый лес','219.mp3',4),(219,'repetitive','монотонный','220.mp3',4),(220,'salesperson','продавец','221.mp3',4),(221,'fire safety check','Проверка пожарной безопасности','222.mp3',4),(222,'grad school','аспирантура','223.mp3',4),(223,'You might want to','Возможно, ты захочешь','224.mp3',4),(224,'I wouldn’t worry about that.','Я бы не беспокоился об этом.','225.mp3',4),(225,'I just don’t find it very interesting.','Я просто не нахожу это очень интересным.','226.mp3',4),(226,'to examine myself','попробовать себя в чем-то','227.mp3',4),(227,'You should have done smt','Вы должны были сделать что-то','228.mp3',4),(228,'to meet the deadline','выполнять все в срок','229.mp3',4),(229,'I meant to tell you','Я хотел сказать вам','230.mp3',4),(230,'regrets','сожаление','231.mp3',4),(231,'inventors','изобретатели','232.mp3',5),(232,'Put them away.','Убери их подальше. ','233.mp3',5),(233,'Hook it up.','Подцепить. ','234.mp3',5),(234,'Look it up.','Поищи это','235.mp3',5),(235,'Pick it up.','Подними это. ','236.mp3',5),(236,'Put it down.','Положи. ','237.mp3',5),(237,'Print it out.','Распечатай. ','238.mp3',5),(238,'Put them on.','Положить их. Надень их','239.mp3',5),(239,'Take them off.','Сними их. ','240.mp3',5),(240,'Take it apart.','Разбери на части. ','241.mp3',5),(241,'Throw it away.','Выброси это. ','242.mp3',5),(242,'Turn it down.','Потише ','243.mp3',5),(243,'Turn it up.','Погромче','244.mp3',5),(244,'on one hand','с одной стороны','245.mp3',5),(245,'on the other hand','с другой стороны','246.mp3',5),(246,'savvy','смекалистый, подкованый, опытный','247.mp3',5),(247,'hold onto','держаться, вцепиться','248.mp3',5),(248,'when it comes to','когда дело доходит до','',5),(249,'is on the rise','на подъем, расти','250.mp3',5),(250,'to get better','стать лучше','251.mp3',5),(251,'know what to look for','знать что искать (ожидать)','252.mp3',5),(252,'overseas','зарубежный','253.mp3',5),(253,'urgently','срочно','254.mp3',5),(254,'by the time','к тому времени','255.mp3',5),(255,'recognize','распознавать','256.mp3',5),(256,'allegedly from a friend','якобы от друга','257.mp3',5),(257,'apply to the court','подать в суд','258.mp3',5),(258,'but it turned out to be a scam','Но это оказалось мошенничеством','259.mp3',5),(259,'sneeze','чихать','260.mp3',5),(260,'put it together','собрать что-то','261.mp3',5),(261,'to plug it in','подключить его','262.mp3',5),(262,'identity theft','кража личных данных','263.mp3',5),(263,'to avoid','избегать','264.mp3',5),(264,'distracting','отвлекать','265.mp3',5),(265,'power cord','шнур питания','266.mp3',5),(266,'to cheat smb out of money','обмануть кого-то на деньги','267.mp3',5),(267,'alert','тревога','268.mp3',5),(268,'precaution','меры предосторожности','269.mp3',5),(269,'a victim','жертва','270.mp3',5),(270,'circumstances','обстоятельства','271.mp3',5),(271,'despite the fact that','несмотря на то, что','272.mp3',5),(272,'Prerequisites','Предварительные условия','273.mp3',5),(273,'assume','предполагать','274.mp3',5),(274,'valuable','ценный','275.mp3',5),(275,'aspiring','Стремясь','276.mp3',5),(276,'sensible','разумный','277.mp3',5),(277,'more in depth','более углубленно','278.mp3',5),(278,'future-facing','на будущее (ориентироваться, сделать)','279.mp3',5),(279,'capabilities','Возможности','280.mp3',5),(280,'as well','также','281.mp3',5),(281,'all the way down','сверху вниз','282.mp3',5),(282,'invoke','вызывать','283.mp3',5),(283,'corresponding','соответствующий','284.mp3',5),(284,'essential','существенный','285.mp3',5),(285,'thriving','процветать','286.mp3',5),(286,'We’re going to cover','мы рассмотрим','287.mp3',5),(287,'dig deeper','Копнуть глубже','288.mp3',5),(288,'rest of this','остальное из этого','289.mp3',5),(289,'approachable','доступный','290.mp3',5),(290,'very first','самый первый','291.mp3',5),(291,'blueprints','чертежи','292.mp3',5),(292,'take a closer look','взгляните поближе','293.mp3',5),(293,'embedding','встраивать','294.mp3',5),(294,'to nest','вложить','295.mp3',5),(295,'layout','макет','296.mp3',5),(296,'Therefore','Следовательно','297.mp3',5),(297,'number of times','количество раз','298.mp3',5),(298,'handy','удобный','299.mp3',5),(299,'Handling','обработка','300.mp3',5),(300,'precedence','приоритет','301.mp3',5),(301,'inherit','наследовать','302.mp3',5),(302,'a stunt','трюк','303.mp3',6),(303,'violent / cruel','насильственный / жестокий','',6),(304,'an alien','чужой','305.mp3',6),(305,'to intend','намереваться','306.mp3',6),(306,'a tearjerker','слезодавилка','307.mp3',6),(307,'frightening','пугающий','308.mp3',6),(308,'scary','страшный','309.mp3',6),(309,'to take place','иметь место','310.mp3',6),(310,'to spoil','испортить','311.mp3',6),(311,'reference','ссылка','312.mp3',6),(312,'attractive','привлекательный','313.mp3',6),(313,'ongoing','непрерывный','314.mp3',6),(314,'duration','продолжительность','315.mp3',6),(315,'mesmerizing','завараживающий','316.mp3',6),(316,'likely','вероятно','',6),(317,'memorable','памятный','318.mp3',6),(318,'thrilling','захватывающий','319.mp3',6),(319,'stunning','оглушительный/ ошеломляющий','320.mp3',6),(320,'A reign','Царствование','321.mp3',6),(321,'to conquer','покорять, завоевывать','322.mp3',6),(322,'to be sympathetic to','быть сочувствующим','323.mp3',6),(323,'inevitable','неизбежный','324.mp3',6),(324,'to be glued to','быть приклеенным к','325.mp3',6),(325,'worldwide','всемирный','326.mp3',6),(326,'all in all','в общем','327.mp3',6),(327,'to refer','относиться / ссылаться','328.mp3',6),(328,'in terms of','с точки зрения (опираясь на какие-либо факты)','329.mp3',6),(329,'to break box office records','Побить рекорды кассовых сборов','330.mp3',6),(330,'the highest degree','самая высокая степень','331.mp3',6),(331,'a string','строка струна цепь','332.mp3',6),(332,'hilarious','веселый','333.mp3',6),(333,'ceiling','потолок','334.mp3',6),(334,'attic','чердак','335.mp3',6),(335,'I could not watch  most of it','Я не мог смотреть большую часть этого','336.mp3',6),(336,'set in Chinа','Происходить в Китае','',6),(337,'to come from','приехать из / происходить из','338.mp3',6),(338,'a suspense','ожидание / неизвестность','339.mp3',6),(339,'you are taken by surprise','Вас застали в расплох','340.mp3',6),(340,'to  be out','отсутствовать / вышел в прокат','341.mp3',6),(341,'grass','трава','342.mp3',6),(342,'He have been playing for ages','Он играет целую вечность','',6),(343,'implementation','реализация','344.mp3',6),(344,'fidelity','верность','345.mp3',6),(345,'whole','весь','346.mp3',6),(346,'advertisement','реклама','347.mp3',6),(347,'surveillance','наблюдение','348.mp3',6),(348,'malicious','злонамеренный','349.mp3',6),(349,'on loved ones','на близких','350.mp3',6),(350,'significant','существенный','351.mp3',6),(351,'interpret','интерпретировать','352.mp3',6),(352,'supply','поставка','353.mp3',6),(353,'appropriately','соответствующим образом','354.mp3',6),(354,'meaningful','значимый','355.mp3',6),(355,'bonds','связи, облигации','356.mp3',6),(356,'range of','диапазон/ разнообразие чего-то','357.mp3',6),(357,'grumpy','сердитый','358.mp3',6),(358,'rogue','Изгой','359.mp3',6),(359,'investigate','расследовать/ изучить /исследовать','360.mp3',6),(360,'defensive','оборонительный','361.mp3',6),(361,'spitting','плевать','362.mp3',6),(362,'speculated','спекулировать/ предполагать','363.mp3',6),(363,'emotional displays','Эмоциональные проявления','364.mp3',6),(364,'come across smb','столкнуться с кем-то','365.mp3',6),(365,'hiss','шипеть','366.mp3',6),(366,'spit','плевать','367.mp3',6),(367,'prompt','незамедлительный','368.mp3',6),(368,'to be concerned about','быть обеспокоенным','369.mp3',6),(369,'to affect','влиять','370.mp3',6),(370,'tendency','тенденция','371.mp3',6),(371,'in order to','чтобы','372.mp3',6),(372,'likelihood','вероятность','373.mp3',6),(373,'experiencing','переживание','374.mp3',6),(374,'pastimes','перспективы','375.mp3',6),(375,'boredom','скука','376.mp3',6),(376,'grief','горе','377.mp3',6),(377,'anxiety','беспокойство, тревога','378.mp3',6),(378,'discover','обнаружить','379.mp3',6),(379,'serve','обслуживать','380.mp3',6),(380,'life-altering','изменение жизни','381.mp3',6),(381,'long-lasting','долгоиграющий','382.mp3',6),(382,'brief','краткий','383.mp3',6),(383,'inspire','вдохновлять','384.mp3',6),(384,'certain ways','определенные способы','385.mp3',6),(385,'engage','привлекать','386.mp3',6),(386,'meaningfully','Значительно','387.mp3',6),(387,'As long as','в том случае если','388.mp3',6),(388,'Would it be all right with you if I do...','Ничего если я сделаю ... / Будет ли все ок если я сделаю..','389.mp3',6),(389,'bullshit','фигня','390.mp3',6),(390,'sour','кислый','391.mp3',6),(391,'expenses','затраты','392.mp3',6),(392,'survey','опрос','393.mp3',6),(393,'solution','решение','394.mp3',6),(394,'postpone','откладывать','395.mp3',6),(395,'bother','беспокоить','396.mp3',6),(396,'to catch up','наверстать, догнать','397.mp3',6),(397,'to get back','получить назад','398.mp3',6),(398,'recipts','квитанции','399.mp3',6),(399,'suburbs','пригород','400.mp3',6),(400,'What have you been up to?','Что ты делал все это время?','401.mp3',6),(401,'practised','практикуется','402.mp3',6),(402,'mysterious','загадочный','403.mp3',6),(403,'accurate','точный','404.mp3',6),(404,'a plot','Участок / cюжет','405.mp3',6),(405,'enlarge','увеличить','406.mp3',6),(406,'firmly','твердо','407.mp3',6),(407,'certain','определенный','408.mp3',6),(408,'precise accurate','точный','410.mp3',6),(409,'several one after another','несколько один за другим','411.mp3',6),(410,'do better than ever before','делать лучше, чем когда-либо прежде','412.mp3',6),(411,'highest-grossing','самые высокие','413.mp3',6),(412,'previously','ранее','414.mp3',6),(413,'keep smb doing smt','не позволять кому-то сделать что-то','415.mp3',6),(414,'No matter what we do, it always turns out that way','Неважно, что мы делаем, это всегда пполучается вот так','416.mp3',7),(415,'Broken glass means good luck','Посуда бьеться на счастье','417.mp3',7),(416,'To throw a tanturm','Закатить истерику','418.mp3',7),(417,'Jealous','Ревнивый','419.mp3',7),(418,'Anxious','Тревожный','420.mp3',7),(419,'determined','определенный/ решительный','421.mp3',7),(420,'inspiring','вдохновляя','422.mp3',7),(421,'encouraging','поощрение, побуждение','423.mp3',7),(422,'to aim','ставить цель','424.mp3',7),(423,'disadvantaged','обездоленный','425.mp3',7),(424,'Immersion','Погружение','426.mp3',7),(425,'to tackle','решать, преодолевать','427.mp3',7),(426,'Demmanding','Требовательный','428.mp3',7),(427,'to take part in smt','принять участие в чём-то','429.mp3',7),(428,'participant','участник','430.mp3',7),(429,'committed','преданный идее','431.mp3',7),(430,'piece of music','музыкальная пьеса','432.mp3',7),(431,'a conductor','проводник / дирежер','433.mp3',7),(432,'an obstacle','препятствие','434.mp3',7),(433,'resilient','устойчивый','435.mp3',7),(434,'Flourishing','Процветает','436.mp3',7),(435,'groundbreaking','новатор','437.mp3',7),(436,'speculating','спекуляция/ размышления / предположение','438.mp3',7),(437,'surely','конечно','439.mp3',7),(438,'to amuse','развлекать','440.mp3',7),(439,'to charm','очаровать','441.mp3',7),(440,'discourage','препятствовать','442.mp3',7),(441,'to exhaust','изматывать, утомлять','443.mp3',7),(442,'to fascinate','очаровывать','444.mp3',7),(443,'to frustrate','расстраивать','445.mp3',7),(444,'he is moved by passion','Он движем страстью к чему-то','446.mp3',7),(445,'to overwhelm','сокрушить','447.mp3',7),(446,'to perplex','сбивать с толку','448.mp3',7),(447,'to please','радовать','449.mp3',7),(448,'to satisfy','удовлетворить','450.mp3',7),(449,'to terrify','напугать','451.mp3',7),(450,'to threaten','угрожать','452.mp3',7),(451,'to thrill','захватывать','453.mp3',7),(452,'to tire','уставать','454.mp3',7),(453,'accustom','привыкать','455.mp3',7),(454,'to write it down','записать это','456.mp3',7),(455,'to go abroad','выехать за рубеж','457.mp3',7),(456,'to dream of doing smt','мечтать о том, чтобы сделать SMT','458.mp3',7),(457,'Just in case.','Так, на всякий случай.','459.mp3',7),(458,'exhausting','утомительный','460.mp3',7),(459,'I would rather be safe than sorry','Я бы предпочел быть в безопасности, чем потом жалеть','461.mp3',7),(460,'aware','осведомленный','462.mp3',7),(461,'to stick to smt','придерживаться SMT','463.mp3',7),(462,'occur','появляться','464.mp3',7),(463,'are you up on the news','Ты в курсе новостей','465.mp3',7),(464,'Contestant','Участники','466.mp3',8),(465,'Solely','Исключительно','467.mp3',8),(466,'Intense','Интенсивный','468.mp3',8),(467,'Eyesight','Зрение','469.mp3',8),(468,'Autoimmune','Аутоиммунный','471.mp3',8),(469,'Obstacle','Препятствие','472.mp3',8),(470,'Capable','Способный','473.mp3',8),(471,'Prove yourself to the world','Доказать что ты чего то стоишь','474.mp3',8),(472,'Pick herself up','Соберись','475.mp3',8),(473,'Tentative','Пробный','476.mp3',8),(474,'Amateur','Любитель','477.mp3',8),(475,'Capture','Захватывать','478.mp3',8),(476,'Inspiring','Вдохновляя','479.mp3',8),(477,'Blind','Слепой','480.mp3',8),(478,'Whip up','На скорую руку','481.mp3',8),(479,'Masterpieces','Шедевры','482.mp3',8),(480,'to be capable of doing smth','быть способным сделать что-л.','483.mp3',8),(481,'Accomplished','Опытный','484.mp3',8),(482,'Determined','Решительный','485.mp3',8),(483,'Courageous','Храбрый','486.mp3',8),(484,'To paddle','Грести','487.mp3',8),(485,'Miraculously','Чудесным образом','488.mp3',8),(486,'Above all else','Помимо всего','489.mp3',8),(487,'To give a lift','Подбросить','490.mp3',8),(488,'Makeover','Преображение','491.mp3',8),(489,'Scruffy','Неопрятный','492.mp3',8),(490,'Dressy','Нарядный','493.mp3',8),(491,'To flip through','Просмотреть','494.mp3',8),(492,'Flattering','Польщенный','495.mp3',8),(493,'Fabric','Ткань','496.mp3',8),(494,'To liven up / to jazz up','Приободрить ; принарядить','497.mp3',8),(495,'Tailored','Сшитый на заказ','498.mp3',8),(496,'Stained','Запятнанный','499.mp3',8),(497,'Faded','Блеклый,выцветший','500.mp3',8),(498,'Scuffed','Потертый','501.mp3',8),(499,'Surface','Поверхность','502.mp3',8),(500,'A consignment store','Комиссионный магазин','503.mp3',8),(501,'An essential','Необходимость','504.mp3',8),(502,'Intentionally','Намеренно','505.mp3',8),(503,'To dress down','Одеваться попроще','506.mp3',8),(504,'Hooked','Подсаженный','507.mp3',8),(505,'Solid','Твердый, сплошной','508.mp3',8),(506,'Pastel','Пастель','509.mp3',8),(507,'consider doing','посмотрим','510.mp3',8),(508,'enjoy doing','получать наслаждение, делая','511.mp3',8),(509,'Consonant','Согласный звук','512.mp3',9),(510,'Persuade','Убеждать','513.mp3',9),(511,'Admited','Допущенный','514.mp3',9),(512,'Threaten','Угрожать','515.mp3',9),(513,'Tend','Иметь тенденцию','516.mp3',9),(514,'Intend to','Намерены','',9),(515,'Convince smb to do smt','Убедить / уговаривать','',9),(516,'Encourage smb to do smt','Поощрять SMB сделать SMT','',9),(517,'Appreciate doing','Ценить','',9),(518,'Admit to doing','признаться что делаешь что-то','',9),(519,'Anticipate doing','Предвидеть делать','',9),(520,'Appreciate','Ценить','524.mp3',9),(521,'Avoid doing','Избегать делать','',9),(522,'Consider doing smt','рассматривать сделать что-то','',9),(523,'Deny','Отрицать','527.mp3',9),(524,'Fancy doing smt','нравиться','',9),(525,'Mention','Упомянуть','529.mp3',9),(526,'Postpone doing smt','Отложить делать SMT','',9),(527,'Recall','Вспоминать','531.mp3',9),(528,'It\'s not worth doing','Это не стоит делать','',9),(529,'Can\'t help doing smt','Не могу удержаться не сделать SMT','',9),(530,'Feel like doing','настроен делать что-то','',9),(531,'Object to','Возражать','535.mp3',9),(532,'to get accustomed to doing smt','привыкать делать SMT','',9),(533,'To stand for','Означать','537.mp3',9),(534,'denim','джинс','538.mp3',9),(535,'suede','замша','539.mp3',9),(536,'turtleneck','высокий ворот','540.mp3',9),(537,'polka-dot','в горошек','541.mp3',9),(538,'striped','в полоску','542.mp3',9),(539,'wool','шерсть','543.mp3',9),(540,'boot-cut','Буткат','544.mp3',9),(541,'plaid','плед / в клеточку','545.mp3',9),(542,'flared','дутики','546.mp3',9),(543,'turquoise','бирюзовый','548.mp3',9),(544,'Overestimate','Переоценивать','549.mp3',9),(545,'Ankle','Лодыжка','550.mp3',9),(546,'Trousers','Брюки','551.mp3',9),(547,'Manage to do smt','Суметь сделать SMT','',9),(548,'I did not mean to do that','Я не имел ввиду это','',9),(549,'suggest doing','предложить делать','554.mp3',9),(550,'make smb do smt','заставить кого-то сделать что-то','555.mp3',9),(551,'allow smb to do smt','Разрешить  позволять','556.mp3',9),(552,'advice smb to do smt','Советовать кому-то сделать что-то','557.mp3',9),(553,'expect smb to smt','Ожидать','558.mp3',9),(554,'get smb to do smt','позволять','559.mp3',9),(555,'warn smb to do smt','предупредить SMB сделать SMT','560.mp3',9),(556,'look forward to doing smt','с нетерпением жду, чтобы сделать что-то','561.mp3',9),(557,'there is no point doing smt','нет смысла делать SMT','562.mp3',9),(558,'it\'s no use doing it','Это бесполезно делать это','563.mp3',9),(559,'an addition to doing','в дополнении к чему-то','',9),(560,'Doesn\'t this one look good?','Разве этот не выглядит хорошо?','565.mp3',9),(561,'to sweat','потеть','566.mp3',9),(562,'fitted','подходящий по размеру','567.mp3',9),(563,'whether you want it or not','хотите ли вы этого или нет','568.mp3',9),(564,'variety of smt','Разнообразие SMT','569.mp3',9),(565,'fur coat','шуба','570.mp3',9),(566,'down jaket','пуховик','571.mp3',9),(567,'I am not among','Я не среди ...','572.mp3',9),(568,'flax','лен','573.mp3',9),(569,'Envelope','Конверт','574.mp3',9),(570,'compete','конкурировать','575.mp3',9),(571,'salmon','лосось','576.mp3',9),(572,'flavors','ароматы','577.mp3',9),(573,'that\'s neat','Это класно / окуратно','578.mp3',9),(574,'exhausted','измученный','579.mp3',9),(575,'keep on doing','Продолжай','580.mp3',9),(576,'resist doing','сопротивляться делать','581.mp3',9),(577,'recollect / recall doing','Вспомнить / вспомнить','582.mp3',9),(578,'mean to do','значит сделать','583.mp3',9),(579,'allow smb to do smt','Разрешить SMB сделать SMT','584.mp3',9),(580,'let smb do smt','Позволить кому-то сделать что-то','585.mp3',9),(581,'advice to do','посоветовать сделать что-то','586.mp3',9),(582,'get smb to do smt','убедить SMB сделать SMT','588.mp3',9),(583,'offer to do','предложить сделать','589.mp3',9),(584,'have difficulty in doing smt','иметь сложности в чем то','590.mp3',9),(585,'great choise','широкий / хороший выбор','591.mp3',9),(586,'Urge doing','Побуждать, призывать','592.mp3',9),(587,'I can\'t bear','Я не могу вынести','593.mp3',9),(588,'to be fond of','увлекаться / нравиться','594.mp3',9),(589,'wardrobe','гардероб','595.mp3',9),(590,'insist on','настаивать на','596.mp3',9),(591,'to carve','вырезать','597.mp3',9),(592,'to carve','вырезать','598.mp3',10),(593,'hollow','пустой / полый','599.mp3',10),(594,'I\'m down for that!','Я за это! / я согласен','600.mp3',10),(595,'inclinations','склонность','601.mp3',10),(596,'fuss','суматоха','602.mp3',10),(597,'she told me not to do it','Она сказала мне не делать этого','603.mp3',10),(598,'advice smb not  to do smt','Совет SMB не делать SMT','604.mp3',10),(599,'I would rather do smt','Я предпочел бы сделать SMT','605.mp3',10),(600,'fence','изгородь','606.mp3',10),(601,'this table made of wood','Эта стол из дерева','607.mp3',10),(602,'the paper is made from wood','Бумага сделана из дерева','608.mp3',10),(603,'this soup is made out of mushrooms','Этот суп сделан из грибов','609.mp3',10),(604,'sculptures','скульптуры','610.mp3',10),(605,'carve','вырезать','611.mp3',10),(606,'emeralds','изумруды','612.mp3',10),(607,'bundle','пучок','613.mp3',10),(608,'cherubic / angelic','пухлый','614.mp3',10),(609,'stooped','наклоненный / сутулый','615.mp3',10),(610,'intervening','вмешивающийся','616.mp3',10),(611,'unfriendly','недоброжелательный','617.mp3',10),(612,'indirectly','косвенно / неявно','618.mp3',10),(613,'as long as','так долго как','619.mp3',10),(614,'compatible','совместимый','620.mp3',10),(615,'proclivity','склонность','621.mp3',10),(616,'obliterated','уничтоженый','622.mp3',10),(617,'To point','указывать','623.mp3',10),(618,'Barefoot','Босиком','624.mp3',10),(619,'Affection','Привязанность','625.mp3',10),(620,'To bargain','Торговаться','626.mp3',10),(621,'Appropriate','Подходящее','627.mp3',10),(622,'Acceptable','Приемлемый','628.mp3',10),(623,'To offend','Оскорблять','629.mp3',10),(624,'Wisdom','Мудрость','630.mp3',10),(625,'To quote','Цитировать','631.mp3',10),(626,'Injustice','Несправедливость','632.mp3',10),(627,'Concise','Краткий','633.mp3',10),(628,'Contradictory','Противоречивый','634.mp3',10),(629,'To reflect','Отражать','635.mp3',10),(630,'Deceptive','Обманчиво','636.mp3',10),(631,'To grasp','Понять','637.mp3',10),(632,'Handsome','Красивый','638.mp3',10),(633,'All`s fair in love and war','на войне все средства хороши','639.mp3',10),(634,'Absence','Отсутствие','640.mp3',10),(635,'Out of sight, out of mind','С глаз долой, из сердца вон','641.mp3',10),(636,'Haste makes waste','Поспешишь - людей насмешишь','642.mp3',10),(637,'Out of the frying pan and into the fire','из огня до в полымя  \"Из сковороды и в огонь\"','643.mp3',10),(638,'It takes two to tango','Для танго нужны двое','644.mp3',10),(639,'When the cat`s away, the mice will play','кот из дома - мыши в пляс','645.mp3',10),(640,'Once bitten, twice shy','обожешься на молоке будешь дуть и на водичку','646.mp3',10),(641,'yell','кричать','647.mp3',10),(642,'judgments','суждения','648.mp3',10),(643,'aptly','удачно успешно','649.mp3',10),(644,'Concise','выразительный локаничный','651.mp3',10),(645,'To reflect','Отражать, рефлексировать,','653.mp3',10),(646,'Handsome is as handsome does','человека дела красят','656.mp3',10),(647,'Absence makes the heart grow fonder','Разлука укрепляет чувства','658.mp3',10),(648,'emphasize','подчеркнуть / усиливать','660.mp3',10),(649,'Practice makes perfect','повторение мать ученья','661.mp3',10),(650,'Out of the frying pan and into the fire','Из огня да в полымя','663.mp3',10),(651,'Once bitten, twice shy','обожжешься на молочке будешь дуть и на водичку','666.mp3',10),(652,'Clothes make the man','По одёжке встречают','667.mp3',10),(653,'You can`t judge a book by its cover','Вы не можете судить книгу по обложке','668.mp3',10),(654,'A curfew','Контроль / комендантский час','669.mp3',10),(655,'To settle in','поселиться','670.mp3',10),(656,'abrupt','внезапно','671.mp3',10),(657,'struggling','столкнувшийся с трудностями','672.mp3',10),(658,'admit to doing','допускать / признаваться','',11),(659,'advise doing','советовать','',11),(660,'approve of doing','одобрять','',11),(661,'allow doing','предоставлять, давать возможность, делать что-либо возможным','',11),(662,'anticipate doing','Ожидать, предвидеть, предчувствовать','',11),(663,'appreciate doing','Оценивать, ценить, быть признательным','',11),(664,'argued smb into doing','Убеждать кого-либо делать что-либо','',11),(665,'avoid doing','Избегать, остерегаться, сторониться','',11),(666,'be worth doing','достойный, заслуживающий','',11),(667,'begin doing','начинать','',11),(668,'believe in doing','верить, придавать большое значение','',11),(669,'can\'t help doing','обуздывать, удерживать, избегать','',11),(670,'can\'t stand doing','Не выносить, не переносить','',11),(671,'care about doing','беспокоиться, тревожиться, волноваться','',11),(672,'celebrate doing','праздновать','',11),(673,'complete doing','завершить, заканчивать','',11),(674,'confess to doing','признавать, признаваться, сознаваться','',11),(675,'consider doing','рассматривать, обсуждать, взвешивать, обдумывать','',11),(676,'concentrate on doing','концентрироваться, сосредоточиваться, собираться','',11),(677,'complain about doing','жаловаться на что-либо, выражать недовольство','',11),(678,'delay doing','откладывать, отсрочивать','',11),(679,'deny doing','отрицать, отвергать, не признавать','',11),(680,'depend on doing','зависеть, находиться в зависимости от кого-либо','',11),(681,'despise doing','презирать, относиться с презрением','',11),(682,'Get away with','сойти с рук','697.mp3',12),(683,'get out of','находить оправдания','698.mp3',12),(684,'Get through','преодолеть','699.mp3',12),(685,'Get around to','найти время для чего-то','700.mp3',12),(686,'get to know','узнать кого-то / что-то','701.mp3',12),(687,'Get off','отпроситься, уйти с разрешения','702.mp3',12),(688,'Solitude','Одиночество','703.mp3',12),(689,'Contemplative','Созерцательный','704.mp3',12),(690,'involving','с участием','705.mp3',12),(691,'Bias','Предвзятость','706.mp3',12),(692,'opposing','противодействие','707.mp3',12),(693,'A counterpart','единомышленник','708.mp3',12),(694,'to stand out (in a crowd)','выделиться (в толпе)','709.mp3',12),(695,'to overlook','упускать из виду','710.mp3',12),(696,'Collaborative','Совместный','711.mp3',12),(697,'admiration','восхищение','712.mp3',12),(698,'To praise','Хвалить','713.mp3',12),(699,'An assumption','Предположение','714.mp3',12),(700,'A contribution','Вклад / содействие','715.mp3',12),(701,'To contend','Утверждать','716.mp3',12),(702,'Whereas','не смотря на то что','717.mp3',12),(703,'To retain','Сохранить','718.mp3',12),(704,'Ultimately','В конечном счете','719.mp3',12),(705,'To reduce','Сократить Уменьшить','720.mp3',12),(706,'to suppose','предполагать','721.mp3',12),(707,'alleged','утверждается','722.mp3',12),(708,'It is said that...','говорят что...','723.mp3',12),(709,'The strike is expected to end soon.','Ожидается, что забастовка скоро закончится.','724.mp3',12),(710,'He is alleged to have hit a policeman.','Предполагается, что он ударил полицейского.','725.mp3',12),(711,'There is said to be a secret tunnel\r\nbetween them.','Говорят, что есть секретный туннель  между ними.','726.mp3',12),(712,'Two people are reported to have\r\nbeen injured in the explosion.','Сообщается, что два человека  был ранен в результате взрыва.','727.mp3',12),(713,'Fireworks are supposed to have been invented in China.','Предполагается, что фейерверк был изобретен в Китае.','728.mp3',12),(714,'it is supposed to be a flower','это возможно цветок','729.mp3',12),(715,'it was supposed to be a flower','предполагалось что это цветок','730.mp3',12),(716,'What’s the weather supposed to be like?','Какая погода должна быть?','731.mp3',12),(717,'get off','уйти','732.mp3',12),(718,'no way','ни за что','733.mp3',12),(719,'get out of','убираться из / ускользнуть','734.mp3',12),(720,'get over','преодолеть, пережить','735.mp3',12),(721,'I get the felling that','У меня есть ощущение, что','736.mp3',12),(722,'to beg','умолять','738.mp3',12),(723,'accuse','обвинять','739.mp3',12),(724,'not worth','не стоит','740.mp3',12),(725,'restrained','сдержанный','741.mp3',12),(726,'breathe','дышать','742.mp3',12),(727,'firmly','твердо','743.mp3',12),(728,'struggle','борьба','744.mp3',12),(729,'bias','предвзятость, предубеждение','745.mp3',12),(730,'confident','уверенная в себе','747.mp3',12),(731,'chatty','болтливый','748.mp3',12),(732,'counterparts','коллеги','749.mp3',12),(733,'frequently','часто','750.mp3',12),(734,'praised','похвалил','752.mp3',12),(735,'assumption','предположение','753.mp3',12),(736,'nevertheless','тем не менее','754.mp3',12),(737,'overlooked','упускается из виду','755.mp3',12),(738,'whereas','тогда как','756.mp3',12),(739,'retain','удерживать','757.mp3',12),(740,'contend','утверждать','759.mp3',12),(741,'suffer','страдать','760.mp3',12),(742,'in the comparison to','в сравнении с','761.mp3',12),(743,'wares','изделия / товары','762.mp3',12),(744,'swear','ругаться / клясться','763.mp3',12),(745,'eventually / ultimatly','в конце концов / в конечном итоге','764.mp3',12),(746,'get the feling','почувствовать','765.mp3',12),(747,'Superstitious','Суеверный','',12),(748,'get around to doing smt','приступить к чему-то что долго откладывали','767.mp3',12),(749,'apparently','по всей видимости','768.mp3',12),(750,'gossip','слухи','769.mp3',12),(751,'to figure out','выяснить','770.mp3',12),(752,'a little of each','Немного от  каждого','772.mp3',12),(753,'encourage','поощрять/побуждать','773.mp3',12),(754,'self-assued','самоуверенный','774.mp3',12),(755,'keep a low profile','не привлекать внимание','775.mp3',12),(756,'chitchat','болтовня','776.mp3',12),(757,'among','среди','777.mp3',12),(758,'mess up','испортить','778.mp3',12),(759,'mess up','опростоволоситься','779.mp3',12),(760,'wandering','блуждание','780.mp3',12),(761,'literally','буквально','781.mp3',12),(762,'engaging','вовлечение','782.mp3',12),(763,'initiate','инициировать','783.mp3',12),(764,'daunting','пугающий','784.mp3',12),(765,'get behind','отставать / поддержать / получить за','785.mp3',12),(766,'recycling','утилизация отходов','786.mp3',13),(767,'rubbish','мусор','787.mp3',13),(768,'litter','мусор / мусорить','788.mp3',13),(769,'age of majority','возраст большинства','789.mp3',13),(770,'guilty','виновный','790.mp3',13),(771,'to convict','осуждать','791.mp3',13),(772,'murder','убийство','792.mp3',13),(773,'manslaughter','непредумышленное убийство','793.mp3',13),(774,'assassination','наемный убийца','794.mp3',13),(775,'jaywalking','переход в неположенном месте','795.mp3',13),(776,'shoplifting','Магазинная кража','796.mp3',13),(777,'kidnapping','похищение','797.mp3',13),(778,'robbery','ограбление','798.mp3',13),(779,'burglary','кража со взломом','799.mp3',13),(780,'to get rid of','избавиться','800.mp3',13),(781,'approachable','доступный','801.mp3',13),(782,'Maintain eye contact.','Поддерживать зрительный контакт.','802.mp3',13),(783,'Be fearless.','Будь бесстрашным.','803.mp3',13),(784,'daunting','пугающий','804.mp3',13),(785,'reciprocate','отвечать взаимностью','805.mp3',13),(786,'off-putting','отталкивание','806.mp3',13),(787,'i don\'t like to be a spotlight','Я не люблю быть в центре внимания','',13),(788,'reciprocates','отвечать взаимностью','808.mp3',13),(789,'socialbe','общительный','809.mp3',13),(790,'arson','поджог','810.mp3',13),(791,'mugging','ограбление','811.mp3',13),(792,'vehicle','средство передвижения','812.mp3',13),(793,'joyriding','лихачество на автомобиле','813.mp3',13),(794,'pickpocketing','карманник','814.mp3',13),(795,'money laundering','отмывание денег','815.mp3',13),(796,'bribery','взяточничество','816.mp3',13),(797,'blackmailing','шантаж','817.mp3',13),(798,'violence','насилие','818.mp3',13),(799,'hijacking','угон / захват','819.mp3',13),(800,'vandalism','вандализм','820.mp3',13),(801,'permits','разрешения','821.mp3',13),(802,'to obey the law','подчиняться закону','822.mp3',13),(803,'the age of majority','возраст большинства','823.mp3',13),(804,'to permit smb to do smth','разрешить SMB сделать SMTH','824.mp3',13),(805,'to engage in activities','заниматься деятельностью','825.mp3',13),(806,'to be restricted to','быть ограниченным','826.mp3',13),(807,'to ban','запретить','827.mp3',13),(808,'to pass a law','принять закон','828.mp3',13),(809,'to vote for','проголосовать за','829.mp3',13),(810,'an election','выборы','830.mp3',13),(811,'to get involved in','принять участие в','831.mp3',13),(812,'crumpets','оладьи','832.mp3',13),(813,'obviously','очевидно','833.mp3',13),(814,'it has to grow on me','я должен к этому привыкнуть','834.mp3',13),(815,'assertive','напористый','835.mp3',13),(816,'minor offense','незначительное преступление','836.mp3',13),(817,'probation','испытательный срок','837.mp3',13),(818,'to put something on fire','поджигать что-то','838.mp3',13),(819,'what does the rest have to do with it','причем тут остальные?','839.mp3',13),(820,'what can it influence?','На что это может повлиять?','840.mp3',13),(821,'Tell off','Отчитать','841.mp3',13),(822,'show off','выпендриваться / показываться','842.mp3',13),(823,'put off','отложить','843.mp3',13),(824,'take off','снять / взлететь','844.mp3',13),(825,'piss off','разозлить / отвали','845.mp3',13),(826,'lay off','увольнять / отвянь','846.mp3',13),(827,'Be better off','Будьте лучше','847.mp3',13),(828,'Set off for','Отправился в путешествие','848.mp3',13),(829,'decent','приличный','849.mp3',13),(830,'pull off','выдернуть','850.mp3',13),(831,'rip off','сдирать / грабеж / красть','851.mp3',13),(832,'to attract','привлекать','852.mp3',13),(833,'go off','уходить / срабатывать','853.mp3',13),(834,'Screw it','К черту!','854.mp3',13),(835,'the car pulled off','Машина тронулась','855.mp3',13),(836,'the boat pulled off the shore','Лодка отошла с берега','856.mp3',13),(837,'We pulled off the deal','Мы провернули сделку','857.mp3',13),(838,'Help me pull it off','Помогите мне справиться с этим / Помоги мне это стянуть','858.mp3',13),(839,'I\'m going to go off the wedding','я планирую уйти со свадьбы','859.mp3',13),(840,'My alarm clock did not go off','Мой будильник не сработал','',13),(841,'the risk paid off','риск окупился','861.mp3',13),(842,'taking someone captive','взять кого -то в плен','862.mp3',13),(843,'abandon','покидать / оставлять','863.mp3',13),(844,'mountainbike','горный велосипед','864.mp3',13),(845,'raise','поднимать','865.mp3',13),(846,'malicious','вредоносный','866.mp3',13),(847,'set out','изложить / намереваться','867.mp3',13),(848,'occurred','произошел','868.mp3',13),(849,'I don\'t know how to do it','Я не знаю, как это сделать','869.mp3',13),(850,'in favor','в пользу / во благо','870.mp3',13),(851,'deterrent','сдерживающий фактор','871.mp3',13),(852,'you have got a point there','в этом ты прав','872.mp3',13),(853,'intrusive','навязчивый','873.mp3',13),(854,'invasion','вторжение','874.mp3',13),(855,'petty','мелкий','875.mp3',13),(856,'outskirts','окраина','876.mp3',13),(857,'Trespassing','Посягательство','877.mp3',13),(858,'Stalking','Преследование','878.mp3',13),(859,'Smuggling','Контрабанда','879.mp3',13),(860,'White collar crime','беловоротничковая преступность','880.mp3',13),(861,'Counterfeiting','Подделка','881.mp3',13),(862,'Community service','Общественные работы','882.mp3',13),(863,'A deterrent -','Сдерживающий фактор -','883.mp3',13),(864,'To underestimate','Недооценивать','885.mp3',13),(865,'A third party','Третий участник','886.mp3',13),(866,'To keep up with','идти в ногу с','887.mp3',13),(867,'To opt out','Отказаться','888.mp3',13),(868,'To outsmart','Перехитрить','889.mp3',13),(869,'A malware -','Вредоносное ПО -','890.mp3',13),(870,'A sentence','Предложение','891.mp3',13),(871,'An offense','Преступление','892.mp3',13),(872,'in a way','в некотором смысле','893.mp3',13),(873,'law-abiding','законопослушный','894.mp3',13),(874,'to gather','собирать','895.mp3',13),(875,'underestimated','недооценен','',13),(876,'pose','представлять','897.mp3',13),(877,'opt out','уклоняться','898.mp3',13),(878,'going cold turkey','резко что-то бросить / иметь ломку','899.mp3',13),(879,'embrace','объятие','900.mp3',13),(880,'binge','разгул, тусовка, попойка','901.mp3',13),(881,'bombarded','заваленный работой / информацией','902.mp3',13),(882,'crave','жаждать','903.mp3',13),(883,'detrimental','вредный / пагубный','904.mp3',13),(884,'encroach','посягательства','905.mp3',13),(885,'exacerbate','усугубляеть','906.mp3',13),(886,'off-grid','отключенный от сети','907.mp3',13),(887,'predilection','склонность','908.mp3',13),(888,'rambler','бродяга, прохожий','909.mp3',13),(889,'resistant','устойчивый','910.mp3',13),(890,'rudimentary','рудиментарный','911.mp3',13),(891,'tiresome','утомительный','912.mp3',13),(892,'shortages','нехватка','913.mp3',13),(893,'dismay','смятение / разочарование','914.mp3',13),(894,'revels','наслаждается','915.mp3',13),(895,'exacerbated','усугубляется','916.mp3',13),(896,'mattresses','Матрасы','917.mp3',13),(897,'kitchen tap','Кухонный кран','918.mp3',13),(898,'gore','запекшееся кровь','919.mp3',13),(899,'Suggestive Themes','Наводящие на размышления темы','920.mp3',13),(900,'A coincidence','Совпадение','921.mp3',14),(901,'A husband-to-be','Будущий муж','922.mp3',14),(902,'To conjure','заклинать','923.mp3',14),(903,'Out of the blue','как снег на голову','924.mp3',14),(904,'An outback','захолустье','925.mp3',14),(905,'Small world!','Мир тесен','926.mp3',14),(906,'That`s neat!','Это круто!','927.mp3',14),(907,'A superstition','Суеверия','928.mp3',14),(908,'A soulmate','Родственная душа','929.mp3',14),(909,'inheritance','наследование','930.mp3',14),(910,'To come into money','неожиданно разбогатеть','931.mp3',14),(911,'It just sticks in my mind','засело в голове','932.mp3',14),(912,'Inside out','Наизнанку','933.mp3',14),(913,'Pearls','Жемчуг','934.mp3',14),(914,'Purpose','Цель','935.mp3',14),(915,'Maxed out my potential','достиг потолка','936.mp3',14),(916,'to make a wish','загадать желание','937.mp3',14),(917,'Throughout history','На протяжении всей истории','938.mp3',14),(918,'dough','тесто','939.mp3',14),(919,'lorry','грузовик','940.mp3',14),(920,'can\'t keep still','Не могу оставаться на месте','941.mp3',14),(921,'to starve','голодать','942.mp3',14),(922,'What would change','И что бы поменялось?','943.mp3',14),(923,'to trip','путешествовать / споткнуться','944.mp3',14),(924,'headquarters','главное управление / штаб квартира','945.mp3',14),(925,'investigate','расследовать','946.mp3',14),(926,'dubbed','названый / прозваный','947.mp3',14),(927,'appear','появляться','948.mp3',14),(928,'denounce','осуждать','949.mp3',14),(929,'falsehoods','ложь','950.mp3',14),(930,'refutation','опровержение','951.mp3',14),(931,'several','несколько','952.mp3',14),(932,'mistrust','недоверие','953.mp3',14),(933,'established','авторитетный','954.mp3',14),(934,'debunking','разоблачить','955.mp3',14),(935,'to police','контролировать','956.mp3',14),(936,'misusing','злоупотребление','957.mp3',14),(937,'incriminate','обвинять','958.mp3',14),(938,'belittle','преуменьшать','959.mp3',14),(939,'deliberately','умышленно','960.mp3',14),(940,'affairs','события','961.mp3',14),(941,'entertaining','развлекательный','962.mp3',14),(942,'boredom','скука','963.mp3',14),(943,'spreading','распространение','964.mp3',14),(944,'legitimate','законно','965.mp3',14),(945,'figures','фигуры / цифры','966.mp3',14),(946,'tactfully','тактично','967.mp3',14),(947,'unknowingly','неосознанно','968.mp3',14),(948,'assault rifle','Штурмовая винтовка','969.mp3',14),(949,'insignificant','незначительный','970.mp3',14),(950,'We were talking about some silly things','Мы говорили о некоторых глупых вещах','971.mp3',14),(951,'I\'m leaving for some place','Я уезжаю в какое -то место','972.mp3',14),(952,'unless he sells more, he won\'t get much money','Если он не продаст больше, он не получит много денег','973.mp3',14),(953,'give someone a dose/taste of their own medicine','Поступить с кем-то также как он с тобой (Ответочка)','974.mp3',14),(954,'Take them out','Убери их / уничтож их','975.mp3',14),(955,'flush out','вымывать / стереть с лица земли','976.mp3',14),(956,'Preferable','Предпочтительно','977.mp3',14),(957,'Not up to the task?','Не справляешься с задачей?','978.mp3',14),(958,'you\'d be more of a burden','ты был бы большей обузой','979.mp3',14),(959,'rely on smb','Полагаться на SMB','980.mp3',14),(960,'brag about smth','хвастаться SMTH','981.mp3',14),(961,'remind smb about smth','Напомните SMB о SMTH (сделать что-то)','982.mp3',14),(962,'remind smb of smth','Напомнить SMB SMTH (восстановить воспоминания)','983.mp3',14),(963,'accuse smb of smth','обвинить SMB в SMTH','984.mp3',14),(964,'shout at smb','кричать на SMB','985.mp3',14),(965,'apply for','подать заявку на','986.mp3',14),(966,'happen to','случилось с','987.mp3',14),(967,'insist on','настаивать на','988.mp3',14),(968,'laugh at smb','смеяться над кем-то','989.mp3',14),(969,'blame smb for smth','винить SMB за SMTH','990.mp3',14),(970,'blame smth on smb','вменять что-то кому-то','991.mp3',14),(971,'suffer from smt','страдать от Smt','992.mp3',14),(972,'An optician','Окулист','993.mp3',15),(973,'To adjust','настроить','994.mp3',15),(974,'To fall apart','Разваливаться на части','995.mp3',15),(975,'To tighten','затягивать','996.mp3',15),(976,'to tune','настроить','997.mp3',15),(977,'to dent','вмятины','998.mp3',15),(978,'hollow','пустой / углубление','999.mp3',15),(979,'unsteadily','неустойчиво','1000.mp3',15),(980,'To flicker','мерцать','1001.mp3',15),(981,'To tackle / solve','решить','1002.mp3',15),(982,'To perform','осуществлять','1003.mp3',15),(983,'Unrelated','Не связанный','1004.mp3',15),(984,'rust','ржавчина','1005.mp3',15),(985,'Chipped','Сколоть','1006.mp3',15),(986,'i\'m not exaggerating','Я не преувеличиваю','1007.mp3',15),(987,'a downy or furry','пушистый мохнатый','1008.mp3',15),(988,'dampness','сырость','1009.mp3',15),(989,'decay','разлагаться','1010.mp3',15),(990,'Cracked','Потрескался','1011.mp3',15),(991,'scratched','поцарапанный','1012.mp3',15),(992,'Thus','Таким образом','1013.mp3',15),(993,'convincing','убедительный','1014.mp3',15),(994,'was not taken into consideration','не был принят во внимание','1015.mp3',15),(995,'Hebrew','иврит','1016.mp3',15),(996,'hang over','Похмелье','1017.mp3',15),(997,'persistent','настойчивый','1018.mp3',15),(998,'pluck','выщипывать','1019.mp3',15),(999,'to come across','встретить, наткнуться','1020.mp3',15),(1000,'make up my mind','решиться / определиться','1021.mp3',15),(1001,'to be into minds','быть в замешательстве','1022.mp3',15),(1002,'get on smb nerves','действовать на нервы','1023.mp3',15),(1003,'put up with smt','примириться с чем-то','1024.mp3',15),(1004,'suburb','пригород','1025.mp3',15),(1005,'outskirts','окраина','1026.mp3',15),(1006,'it\'s nothing out of the ordinary','Нет ничего необычного','1027.mp3',15),(1007,'to brighten up','осветлиь /сделать ярче','1028.mp3',15),(1008,'to go with smth','сочетаться с чем-то','1029.mp3',15),(1009,'to be fed up','сыты по горло','1030.mp3',15),(1010,'put you up','приютить / поселить','1031.mp3',15),(1011,'hesitate','стесняться / колебаться','1032.mp3',15),(1012,'drop in','зайти / заскакивать','1033.mp3',15),(1013,'drop me a line','черкани мне / напиши мне','1034.mp3',15),(1014,'briefly','вкратце / кратко','1035.mp3',15),(1015,'to have a view of somewhere','обзор на что-то / вид на что-то','1036.mp3',15),(1016,'to vacate','освободить','1037.mp3',15),(1017,'dull','тупой / скучный / пасмурный','1038.mp3',15),(1018,'to pay a casual visit','посетить / заскочить','1039.mp3',15),(1019,'to swing','качаться','1040.mp3',15),(1020,'inspiration','вдохновение','1041.mp3',15),(1021,'burst','лопаться','1042.mp3',15),(1022,'awards','награды','1043.mp3',15),(1023,'venue','место проведения','1044.mp3',15),(1024,'leak','утечка','1045.mp3',15),(1025,'mold','плесень','1046.mp3',15),(1026,'to mope','хандрить','1047.mp3',15),(1027,'to sulk','дуться','1048.mp3',15),(1028,'self-esteem','самооценка','1049.mp3',15),(1029,'decisive','решительный','1050.mp3',15),(1030,'impulsive','импульсивный','1051.mp3',15),(1031,'jealous','ревнивый','1052.mp3',15),(1032,'guilty','виновный','1053.mp3',15),(1033,'ashamed','стыдящийся / престыженный','1054.mp3',15),(1034,'self-disciplined','самодисциплинированный','1055.mp3',15),(1035,'flexible','гибкий','1056.mp3',15),(1036,'Go with the flow.','Будь в потоке','1057.mp3',15),(1037,'pontificate','разглагольствовать','1058.mp3',16),(1038,'set aside','Отложить в сторону','1059.mp3',16),(1039,'vurnerable','уязвимый','1060.mp3',16),(1040,'assume','предполагать','1061.mp3',16),(1041,'Talk should not be cheap.','Разговор не должен быть дешевым (не о чём).','1062.mp3',16),(1042,'caution','осторожность','1063.mp3',16),(1043,'condescending','снисходительный','1064.mp3',16),(1044,'Stay out of the weeds.','Будь конкретным (Держись подальше от сорняков).','1065.mp3',16),(1045,'sympathetic','сочувствующий','1066.mp3',16),(1046,'sensitive','чувствительный','1067.mp3',16),(1047,'grief','горе','1068.mp3',16),(1048,'to get tied up in traffic','застрять в пробке','1069.mp3',16),(1049,'to knock sb over','сбить с ног','1070.mp3',16),(1050,'to maintain','поддерживать (существование, не позволять становиться меньше)','1071.mp3',16),(1051,'preoccupied','озабоченый','1072.mp3',16),(1052,'deep down','в глубине души','1073.mp3',16),(1053,'pride','гордость','1074.mp3',16),(1054,'unwillingly','неохотно','1075.mp3',16),(1055,'entirely','полностью','1076.mp3',16),(1056,'to imply','подразумевать','1077.mp3',16),(1057,'awkward','неловко','1078.mp3',16);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desks`
--

DROP TABLE IF EXISTS `desks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `desks_owner_id_2834da65_fk_users_id` (`owner_id`),
  KEY `desks_name_70224f43` (`name`),
  CONSTRAINT `desks_owner_id_2834da65_fk_users_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desks`
--

LOCK TABLES `desks` WRITE;
/*!40000 ALTER TABLE `desks` DISABLE KEYS */;
INSERT INTO `desks` VALUES (1,'Cambridge Touchstone 3 Unit 6','','private',1),(2,'Cambridge Touchstone 1 Unit 1','','private',1),(3,'Cambridge Touchstone 3 Unit 7','','private',1),(4,'Cambridge Touchstone 3 Unit 8','','private',1),(5,'Cambridge Touchstone 3 Unit 9','','private',1),(6,'Cambridge Touchstone 3 Unit 10','','private',1),(7,'Cambridge Touchstone 3 Unit 11','','private',1),(8,'Cambridge Touchstone 4 Unit 01','','private',1),(9,'Cambridge Touchstone 4 Unit 02','','private',1),(10,'Cambridge Touchstone 4 Unit 03','','private',1),(11,'Cambridge English gerund or infinitive','','private',1),(12,'Cambridge Touchstone 4 Unit 04','','private',1),(13,'Cambridge Touchstone 4 Unit 05','','private',1),(14,'Cambridge Touchstone 4 Unit 06','','private',1),(15,'Cambridge Touchstone 4 Unit 07','','private',1),(16,'Cambridge Cabridge Unit 08','','private',1);
/*!40000 ALTER TABLE `desks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desks_users`
--

DROP TABLE IF EXISTS `desks_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desks_users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `desk_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `desks_users_desk_id_user_id_5e4dbaab_uniq` (`desk_id`,`user_id`),
  KEY `desks_users_user_id_c49d2890_fk_users_id` (`user_id`),
  CONSTRAINT `desks_users_desk_id_6a883eea_fk_desks_id` FOREIGN KEY (`desk_id`) REFERENCES `desks` (`id`),
  CONSTRAINT `desks_users_user_id_c49d2890_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desks_users`
--

LOCK TABLES `desks_users` WRITE;
/*!40000 ALTER TABLE `desks_users` DISABLE KEYS */;
INSERT INTO `desks_users` VALUES (6,1,1),(3,2,1),(7,3,1),(8,4,1),(9,5,1),(4,6,1),(5,7,1),(10,8,1),(11,9,1),(12,10,1),(2,11,1),(13,12,1),(14,13,1),(15,14,1),(16,15,1),(1,16,1);
/*!40000 ALTER TABLE `desks_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(6,'authtoken','token'),(7,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(9,'server','apistat'),(11,'server','card'),(10,'server','desk'),(12,'server','learningprogress'),(8,'server','user'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-08-10 15:19:48.732536'),(2,'contenttypes','0002_remove_content_type_name','2022-08-10 15:19:48.747402'),(3,'auth','0001_initial','2022-08-10 15:19:48.807024'),(4,'auth','0002_alter_permission_name_max_length','2022-08-10 15:19:48.819976'),(5,'auth','0003_alter_user_email_max_length','2022-08-10 15:19:48.823387'),(6,'auth','0004_alter_user_username_opts','2022-08-10 15:19:48.826763'),(7,'auth','0005_alter_user_last_login_null','2022-08-10 15:19:48.830110'),(8,'auth','0006_require_contenttypes_0002','2022-08-10 15:19:48.831185'),(9,'auth','0007_alter_validators_add_error_messages','2022-08-10 15:19:48.834569'),(10,'auth','0008_alter_user_username_max_length','2022-08-10 15:19:48.837918'),(11,'auth','0009_alter_user_last_name_max_length','2022-08-10 15:19:48.841373'),(12,'auth','0010_alter_group_name_max_length','2022-08-10 15:19:48.847135'),(13,'auth','0011_update_proxy_permissions','2022-08-10 15:19:48.850819'),(14,'auth','0012_alter_user_first_name_max_length','2022-08-10 15:19:48.854176'),(15,'server','0001_initial','2022-08-10 15:19:49.025240'),(16,'admin','0001_initial','2022-08-10 15:19:49.057521'),(17,'admin','0002_logentry_remove_auto_add','2022-08-10 15:19:49.063821'),(18,'admin','0003_logentry_add_action_flag_choices','2022-08-10 15:19:49.070740'),(19,'authtoken','0001_initial','2022-08-10 15:19:49.091387'),(20,'authtoken','0002_auto_20160226_1747','2022-08-10 15:19:49.113307'),(21,'authtoken','0003_tokenproxy','2022-08-10 15:19:49.115187'),(22,'sessions','0001_initial','2022-08-10 15:19:49.124645'),(23,'server','0002_alter_desk_name','2022-08-13 03:22:08.447026'),(24,'server','0003_alter_desk_name','2022-08-13 03:22:08.464931'),(25,'server','0004_alter_desk_name','2022-08-13 03:22:08.483606'),(26,'server','0005_alter_desk_name','2022-08-13 03:22:08.501610'),(27,'server','0006_alter_desk_name','2022-08-13 03:22:08.519743'),(28,'server','0007_alter_desk_name','2022-08-13 03:22:22.515765');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_progress`
--

DROP TABLE IF EXISTS `learning_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `learning_progress` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `next_show_in` datetime(6) DEFAULT NULL,
  `step` smallint(5) unsigned NOT NULL CHECK (`step` >= 0),
  `card_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learning_progress_user_id_card_id_727651bf_uniq` (`user_id`,`card_id`),
  KEY `learning_progress_card_id_3fc71b59_fk_cards_id` (`card_id`),
  CONSTRAINT `learning_progress_card_id_3fc71b59_fk_cards_id` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`),
  CONSTRAINT `learning_progress_user_id_ff1fe722_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_progress`
--

LOCK TABLES `learning_progress` WRITE;
/*!40000 ALTER TABLE `learning_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `learning_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `server_apistat`
--

DROP TABLE IF EXISTS `server_apistat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `server_apistat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `request` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `server_apistat`
--

LOCK TABLES `server_apistat` WRITE;
/*!40000 ALTER TABLE `server_apistat` DISABLE KEYS */;
INSERT INTO `server_apistat` VALUES (1,'/users/self/',0.0064590129995849566),(2,'/users/self/',0.0026323960000809166),(3,'/desks/download_available_desks/',0.004205086999718333),(4,'/cards/load_cards_in_desks/',0.004393939000692626),(5,'/media/cards/233.mp3',0.000493360999826109),(6,'/cards/load_cards_in_desks/',0.0036145770000075572),(7,'/media/cards/669.mp3',0.0002474490001986851),(8,'/cards/load_cards_in_desks/',0.0035686920000443934),(9,'/media/cards/1006.mp3',0.0002341779991184012);
/*!40000 ALTER TABLE `server_apistat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_valid_until` datetime(6) DEFAULT NULL,
  `auto_translate` tinyint(1) NOT NULL,
  `auto_sound` tinyint(1) NOT NULL,
  `learning_speed` double NOT NULL,
  `learning_mode` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sound_on` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'',NULL,0,'','',0,1,'2022-08-10 15:20:18.763473','destinyend@yandex.ru','a',NULL,1,1,5,'en>ru',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_groups_user_id_group_id_fc7788e8_uniq` (`user_id`,`group_id`),
  KEY `users_groups_group_id_2f3517aa_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_groups_group_id_2f3517aa_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_groups_user_id_f500bee5_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_permissions`
--

DROP TABLE IF EXISTS `users_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_permissions_user_id_permission_id_3b86cbdf_uniq` (`user_id`,`permission_id`),
  KEY `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_permissions_user_id_92473840_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_permissions`
--

LOCK TABLES `users_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-13  3:22:45
