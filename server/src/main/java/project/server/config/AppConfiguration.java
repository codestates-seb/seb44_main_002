package project.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import project.server.domain.cocktail.embed.category.Category;
import project.server.domain.cocktail.embed.ingredient.Ingredients;
import project.server.domain.cocktail.embed.liquor.Liquor;
import project.server.domain.cocktail.embed.rate.Rate;
import project.server.domain.cocktail.embed.recipe.Recipe;
import project.server.domain.cocktail.embed.tag.Tag;
import project.server.domain.cocktail.embed.tag.Tags;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.cocktail.repository.CocktailRepository;
import project.server.domain.user.User;
import project.server.domain.user.UserRepository;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AppConfiguration implements InitializingBean {

    private final UserRepository userRepository;
    private final CocktailRepository cocktailRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void afterPropertiesSet() throws Exception {
        init();
    }

    private void init() {
        createTestUsers();
        createCocktails();
    }

    public void createTestUsers() {
        User admin = new User();
        admin.setName("admin");
        admin.setEmail("shworud29@gmail.com");
        admin.setPassword(passwordEncoder.encode("test1234"));
        admin.setGender("male");
        admin.setAge(29);
        admin.setRoles(List.of("USER", "ADMIN"));
        userRepository.save(admin);

        User test1 = new User();
        test1.setName("test1");
        test1.setEmail("test1@test.com");
        test1.setPassword(passwordEncoder.encode("test1234"));
        test1.setGender("male");
        test1.setAge(29);
        userRepository.save(test1);

        User test2 = new User();
        test2.setName("test2");
        test2.setEmail("test2@test.com");
        test2.setPassword(passwordEncoder.encode("test1234"));
        test2.setGender("female");
        test2.setAge(31);
        userRepository.save(test2);

        User test3 = new User();
        test3.setName("test3");
        test3.setEmail("test3@test.com");
        test3.setPassword(passwordEncoder.encode("test1234"));
        test3.setGender("female");
        test3.setAge(34);
        userRepository.save(test3);
    }

    public void createCocktails() {
        User user = userRepository.findById(1L).get();

        Cocktail paloma = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("팔로마")
                .imageUrl("https://i.namu.wiki/i/YBIxjp_RnDjVtDLZeNwUl-8PDS6Og3zx1ORo8-eIdAF0J7FRpfTzDnu0tKbFivb-IT7acNmWOr9a8a1VI68_qzRYHz-Unn_QMWy8XYeISPMGOT48YyC5SJ4Q7DP8aMencSCaBALK_qfeUlWVnR3qKg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임즘", "자몽소다", "라임", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "데킬라 50ml를 넣어줍니다."
                        , "라임즙 20ml를 넣어줍니다."
                        , "자몽소다를 잔에 가득 채웁니다."
                        , "가니시를 라임 웨지로 마무리합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SWEET, Tag.SOUR)))
                .rate(new Rate())
                .build();
        paloma.assignUser(user);
        cocktailRepository.save(paloma);

        Cocktail sunRise = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("데킬라 선라이즈")
                .imageUrl("https://i.namu.wiki/i/TyR-oMsaDXeXInesGADzIpj1XfR6h-SfUxULAbHUDZ335tnoJVCS2wUJsyzaBoW09iSZsg72g8hj-sZAQvdL82UTGon_gJ5-gTCGY-fhrf6oy5PX0bCYlY2_iK7S8Q_4X9k4EvQi2WaxgrU76RfUFQ.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("그레나딘 시럽", "오렌지 주스", "오렌지", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "데킬라 45ml를 넣어줍니다."
                        , "그레나딘 시럽 15ml를 넣어줍니다."
                        , "오렌지 주스를 잔에 가득 채웁니다."
                        , "가니시를 오렌지 웨지로 마무리합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET, Tag.SOUR)))
                .rate(new Rate())
                .build();
        sunRise.assignUser(user);
        cocktailRepository.save(sunRise);

        Cocktail margarita = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("마가리타")
                .imageUrl("https://i.namu.wiki/i/DjJugO-e7RC2oGwUHLEEGWzndTJ-5VLs_S6smpj0cAORFwp1554jysWWk2hA59ZP3ErhEVxHWT8Wr2tx0v6W3ym1jb4D9MhOGC2fx_nVmI84WGYQmdxK15BMQVmH_XHe1R7DXd1FH1Ys9cPN4HsFMQ.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임즙", "드카이퍼 프리플섹", "심플시럽", "소금", "라임", "얼음", "쉐이크"))))
                .recipe(new Recipe(List.of("쉐이크에 얼음을 넣습니다."
                        , "드카이퍼 트리플섹 20ml를 넣어줍니다."
                        , "라임즙 20ml를 넣어줍니다."
                        , "심플시럽 1대쉬를 넣습니다."
                        , "데킬라 50ml를 넣고 흔들어 차갑게 만듭니다."
                        , "소금을 리밍합니다."
                        , "잔에 차갑게 만든 술을 담고, 가니시는 라임웨지로 마무리합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET)))
                .rate(new Rate())
                .build();
        margarita.assignUser(user);
        cocktailRepository.save(margarita);

        Cocktail graveYard = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("그레이브 야드")
                .imageUrl("https://wine21.speedgabia.com/WINE_MST/TITLE/0146000/W0146857.jpg")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("보드카", "진", "럼", "버번 위스키", "트리플 섹", "스타우드", "라거"))))
                .recipe(new Recipe(List.of("잔에 보드카 30ml를 넣어줍니다."
                        , "진 30ml를 넣어줍니다."
                        , "럼 30ml를 넣어줍니다."
                        , "데킬라 30ml를 넣어줍니다."
                        , "버번 위스키 30ml를 넣어줍니다."
                        , "스카치 위스키 30ml를 넣어줍니다."
                        , "트리플 섹 30ml를 넣어줍니다."
                        , "잔의 남은 양은 스타우드와 라거를 반반 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        graveYard.assignUser(user);
        cocktailRepository.save(graveYard);

        Cocktail sunBurn = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("선 번")
                .imageUrl("https://i.namu.wiki/i/8jnd30WadGNm1eN7oEhK0uys1T23b2-BmEm8uilqQtsAz4OszpLWYjjlJ_V6G3vQIwyxtZ-b80fnutHNHGIA4xndgAjc6a2PPJw5xrsXjkUIM1uVLOUIPDAUl2CpAPsxH1c-NzxFHz3BICwrsVOD7A.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("크랜베리", "트리플 섹", "크렌베리 주스"))))
                .recipe(new Recipe(List.of("잔에 데킬라 37.5ml를 넣어줍니다."
                        , "트리플 섹 30ml를 넣어줍니다."
                        , "크렌베리 주스 90ml를 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        sunBurn.assignUser(user);
        cocktailRepository.save(sunBurn);

        Cocktail strawHat = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("스트로우 햇")
                .imageUrl("https://i.namu.wiki/i/vmsKa9c7hX-nEsbXYU0X1yyeF5Q1TvF1tVLRA3gjWKXOYjCkhpPiYq9Z9mCDS7eiPoZw-7Cx9SLVpWC-AbxXUWNmVNQFnw845dI_GKmU3GA2RbP0oDhtwUL_KbUDmmzWM7v2N3C9fwG09FwRjRWTrA.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("토마토 주스", "타바스코", "굴소스", "소금", "후추"))))
                .recipe(new Recipe(List.of("잔에 데킬라 45ml를 넣어줍니다."
                        , "토마토 주스 90ml를 넣어줍니다."
                        , "타바스코 1티스푼을 넣어줍니다."
                        , "굴소스 1티스푼을 넣어줍니다."
                        , "소금 1꼬집을 넣어줍니다."
                        , "후추 1꼬집을 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET)))
                .rate(new Rate())
                .build();
        strawHat.assignUser(user);
        cocktailRepository.save(strawHat);

        Cocktail desertWater = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("데저트 워터")
                .imageUrl("https://i.namu.wiki/i/sl7rVU7XXidm546PnuBrQbICaaf5M7jRV83v4y2E0aLd3ynG06uWpHRRWCYxQMSdpIAv8HMrZ7bjUp6t1kDq1fEYXL1b6PH47qDpn4DIBxNoMaLOmyn27dz5IR5O5gy6TZY30mBRcWuHRxQk4aroMQ.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("타바스코"))))
                .recipe(new Recipe(List.of("타바스코 소스를 먼저 잔에 넣어줍니다."
                        , "데킬라를 그 위에 플로팅합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.BITTER)))
                .rate(new Rate())
                .build();
        desertWater.assignUser(user);
        cocktailRepository.save(desertWater);

        Cocktail matador = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("마타도르")
                .imageUrl("https://i.namu.wiki/i/t-h2B7S-hLm8q67IgXwCfW55XaABphvg2fndSlOoM1aoCw3Nv90hy4aiNvL8hfI-UBpszdkk_IDI6UYHw6gF8melgEjidUfr6ST6UQDEKZ5aA55CTaVQ_h5kqOwj3MmShVybm_Y53vBxOB42NuFYdg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("파인애플", "체리", "얼음", "파인애플 주스", "레몬 주스"))))
                .recipe(new Recipe(List.of("잔에 데킬라 30ml를 넣어줍니다."
                        , "파인애플 주스 45ml를 넣어줍니다."
                        , "레몬 주스 15ml를 넣어주고 잘 섞어줍니다."
                        , "파인애플 조각과 체리를 칵테일 핀에 꽂아 가니쉬합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SOUR)))
                .rate(new Rate())
                .build();
        matador.assignUser(user);
        cocktailRepository.save(matador);

        Cocktail mexicola = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("멕시콜라")
                .imageUrl("https://i.namu.wiki/i/-WfiyhJDTK_6XAikIhI5EJ5Ymfy6bb5fjwnBdMpMTTDZRByctqyMHWBrssxq8PtW3hOaThF6kPE9T979EgA4R0gMpy7gPjAoNpzznAdHzi_GHEiEn3wpB8uaDBVWj2DeVMOLYt3A_iUPg5Qq9PhnXw.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("콜라", "라임 주스"))))
                .recipe(new Recipe(List.of("잔에 데킬라 45ml를 넣어줍니다."
                        , "콜라 135ml를 넣어줍니다."
                        , "라임 주스 15ml를 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SOUR, Tag.SWEET)))
                .rate(new Rate())
                .build();
        mexicola.assignUser(user);
        cocktailRepository.save(mexicola);

        Cocktail jarana = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("자라나")
                .imageUrl("https://i.namu.wiki/i/fmR0-nUaMorMun574cnFZwUMmVTYfBoDFhbbH14K8A5ASP_dFweSiHg8bPYaf4y2g8XjQrBAVAnM3EnlgOBLOx-9BjRsYDklHPwXRKNKdvtT_PEjtf4V_1Ba8ZLoJuUfcRQa7BGKGyBbyGS-XqJAdQ.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("파인애플 주스", "설탕"))))
                .recipe(new Recipe(List.of("잔에 데킬라 45ml를 넣어줍니다."
                        , "파인애플 주스 120ml를 넣어줍니다."
                        , "설탕 2티스푼을 넣어주고 살짝 섞어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SOUR, Tag.SWEET)))
                .rate(new Rate())
                .build();
        jarana.assignUser(user);
        cocktailRepository.save(jarana);

        Cocktail chimayo = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("치마요")
                .imageUrl("https://i.namu.wiki/i/5vyUEOzbtHAYRnYjik94kjHJjZ37GgGfBdX1YryZ6F0qAiRlLEG_1LizZ8pPfvCK2xSSSW4MMVahw6GceZtlIBEeDw9ldy0yGqna_YYjSdnKM52RnAJZcnmltLhzYxwV1GaNfq8eNIiZKcY_76II-w.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("사과", "사과주", "레몬 주스", "크림 드 카시스"))))
                .recipe(new Recipe(List.of("잔에 데킬라 45ml를 넣어줍니다."
                        , "사과주 30ml를 넣어줍니다."
                        , "레몬 주스 7.5ml를 넣어줍니다."
                        , "크림 드 카시스 7.5ml를 넣어줍니다."
                        , "사과로 가니쉬를 해 완성합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SOUR)))
                .rate(new Rate())
                .build();
        chimayo.assignUser(user);
        cocktailRepository.save(chimayo);

        Cocktail tequilaSour = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("데킬라 사워")
                .imageUrl("https://i.namu.wiki/i/VD4GmyM4xTPeikO8I9i7l51IRijQmRMGfVskFBht1fvPJoyCbj67TOVI471fWq5O5nVz5RnqKU0KLCVZdJ01fRHBDC-ofSBjgxxCbjt0dacw5lfSF2TLSgEvGRJqavrgOs-HdNCVt-a6OYbBZjpgcA.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레몬 주스", "설탕"))))
                .recipe(new Recipe(List.of("잔에 데킬라 15ml를 넣어줍니다."
                        , "레몬 주스 15ml를 넣어줍니다."
                        , "설탕 1티스푼을 넣고 잘 섞어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SOUR, Tag.SWEET)))
                .rate(new Rate())
                .build();
        tequilaSour.assignUser(user);
        cocktailRepository.save(tequilaSour);


    }
}
