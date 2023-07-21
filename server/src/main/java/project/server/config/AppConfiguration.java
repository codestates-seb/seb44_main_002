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
                .imageUrl("https://i0.wp.com/haileydaily.com/wp-content/uploads/2023/07/%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-%EC%BB%A4%ED%94%BC.png?resize=300%2C300&ssl=1")
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

        Cocktail tequilaTonic = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("데킬라 토닉")
                .imageUrl("https://i.namu.wiki/i/QcIOHfMaPhelJC86WNZh_QUHzQXTQMdk84mTrCetnbATTJY5act1BnMluKXlf1Kgos9DzTwyZ6p47eEiQ8Iio7_dKO-Q4NA3yIk4oEhiSrYyi21YxvCgH4KltOBdQpkPao-2X1lAuHIx0tU9fZJqJg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레몬", "토닉워터"))))
                .recipe(new Recipe(List.of("잔에 데킬라 75ml를 넣어줍니다."
                        , "토닉워터 150ml를 넣어줍니다."
                        , "레몬으로 가니쉬합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_HIGH, Tag.SWEET)))
                .rate(new Rate())
                .build();
        tequilaTonic.assignUser(user);
        cocktailRepository.save(tequilaTonic);

        Cocktail elToroLoco = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("엘 토로 로코")
                .imageUrl("https://i.namu.wiki/i/uPYueC9q9PcpTII3vpv_OkhFh1pyv1u5c_jM91003YV2gFja09-5ch2qlWw6qbwxIp1vgr83mbfSAixywPeqirqOr3OHq9y7BxUDmY2b0F82jAvTjJ5Iwm2CApfFPOJav4581JKI8Pq2jyhSK7QP2Q.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레드불"))))
                .recipe(new Recipe(List.of("잔에 데킬라 30ml를 넣어줍니다."
                        , "레드불 90ml를 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET)))
                .rate(new Rate())
                .build();
        elToroLoco.assignUser(user);
        cocktailRepository.save(elToroLoco);

        Cocktail elDiablo = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.TEQUILA)
                .name("엘 디아블로")
                .imageUrl("https://i.namu.wiki/i/fpR0DZ67XJotairGyMh7xc3vDJBq_qW8nNsAFIzfyZl1bXIW3pFgxTqEqjLviQiZqrPi0vBER0M3rReSNzge_RvT8Tp6W-FzeuWY72yO-LOhqufTfCLMfeYlQxW_VM1pLQezrB70E6Nw_scT2tuKdA.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("크림 드 카시스", "라임 주스", "진저 에일"))))
                .recipe(new Recipe(List.of("잔에 데킬라 45ml를 넣어줍니다."
                        , "크림 드 카시스 15ml를 넣어줍니다."
                        , "라임 주스 15ml를 넣어줍니다."
                        , "진저에일 60~90ml 넣어줍니다."
                        , "블랙베리로 가니쉬해 완성합니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SOUR)))
                .rate(new Rate())
                .build();
        elDiablo.assignUser(user);
        cocktailRepository.save(elDiablo);

        Cocktail kahluaMilk = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("깔루아 밀크")
                .imageUrl("https://i.namu.wiki/i/sZ5okkUwRHl0oZcNTjVIwUFkzb-N2sE8oXMOzqDK14Z50hvfE1YIe436RVAB-GYSHHu5rie5MIiKpQCAPYmOHS2vodmwHsrHglF8n9lyyGMW72nonz5TFSEKxsCg-LexxEP_TAdyZklmdkUWHMondg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("우유", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "깔루아 30ml를 넣어줍니다."
                        , "우유 120ml를 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET)))
                .rate(new Rate())
                .build();
        kahluaMilk.assignUser(user);
        cocktailRepository.save(kahluaMilk);

        Cocktail longIslandIceTea = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("롱 아일랜드 아이스티")
                .imageUrl("https://i.namu.wiki/i/j-o2cntSa14kSEi1uDhD-7TDqLSHGft-Pm-Xk77sf86EQqxDj95SkNmyM--imQNLXybEqt-Xdy_J27IdXW4NUbcvwVVSK1ypjgC9k3O9u0q10zPEzKFOLP2qKHK4YZ489a_fUzqGkQKCl1oGAErVeg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("진", "화이트 럼", "보드카", "데킬라", "드카이퍼 트리플섹", "레몬 주스", "콜라", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "진 15ml를 넣어줍니다."
                        , "화이트 럼 15ml를 넣어줍니다."
                        , "보드카 15ml를 넣어줍니다."
                        , "데킬라 15ml를 넣어줍니다."
                        , "드카이퍼 트리플섹 15ml를 넣어줍니다."
                        , "레몬 주스 45ml를 넣어줍니다."
                        , "콜라를 잔 끝까지 채워줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        longIslandIceTea.assignUser(user);
        cocktailRepository.save(longIslandIceTea);

        Cocktail AMF = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("AMF")
                .imageUrl("https://i.pinimg.com/564x/c9/a7/47/c9a7478f472dc283c7f6468de873897a.jpg")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("진", "화이트 럼", "보드카", "데킬라", "블루 큐라소", "레몬 주스", "사이다", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "진 15ml를 넣어줍니다."
                        , "화이트 럼 15ml를 넣어줍니다."
                        , "보드카 15ml를 넣어줍니다."
                        , "데킬라 15ml를 넣어줍니다."
                        , "블루 큐라소 15ml를 넣어줍니다."
                        , "레몬 주스 45ml를 넣어줍니다."
                        , "사이다를 잔 끝까지 채워줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        AMF.assignUser(user);
        cocktailRepository.save(AMF);

        Cocktail tokyoIceTea = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("도쿄 아이스티")
                .imageUrl("https://live.staticflickr.com/5763/23741857192_bea7becf4b_c.jpg")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("진", "화이트 럼", "보드카", "데킬라", "드카이퍼 멜론", "레몬 주스", "사이다", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "진 15ml를 넣어줍니다."
                        , "화이트 럼 15ml를 넣어줍니다."
                        , "보드카 15ml를 넣어줍니다."
                        , "데킬라 15ml를 넣어줍니다."
                        , "드카이퍼 멜론 15ml를 넣어줍니다."
                        , "레몬 주스 45ml를 넣어줍니다."
                        , "사이다를 잔 끝까지 채워줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        tokyoIceTea.assignUser(user);
        cocktailRepository.save(tokyoIceTea);

        Cocktail greenWidow = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("그린 위도우")
                .imageUrl("https://i.namu.wiki/i/8-82cNyg2z1GjlHsRh9NZdbldqucakS70S9dxo14X0Jc0QaqC3fTc36sdj11cSNTlmiuBbY5_9xVT15MRIxIrUJSWK44j4UMmzEuihlsyTgQW-__mxNHWoc8Ot35mL3sJ3IP6ZbJfEtp216oXA31HA.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("오렌지 주스", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "디카이퍼 블루 큐라소 30ml를 넣어줍니다."
                        , "오렌지 주스 45ml를 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        greenWidow.assignUser(user);
        cocktailRepository.save(greenWidow);

        Cocktail baileysMilk = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("베일리스 밀크")
                .imageUrl("https://i.namu.wiki/i/WC9pcehWez9Z4xN2I5TYZvZDqTZcBitsMkOCg5PsLeFZG9-4nMiRGG8LcEYjW7DbWXk45IFSgi2Cx8ugNk0e_CwTacIkvPxPb33BMgt5qlz0-SYFxpuLxl4h0ZBMsO0yimurKD9CKxMsh-pMe8W3XQ.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("우유"))))
                .recipe(new Recipe(List.of("잔에 베일리스를 1/4만큼 넣어줍니다."
                        , "잔에 우유를 3/4만큼 넣어줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET)))
                .rate(new Rate())
                .build();
        baileysMilk.assignUser(user);
        cocktailRepository.save(baileysMilk);

        Cocktail angelTip = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("엔젤 팁")
                .imageUrl("https://i.namu.wiki/i/cNgITQDIGxW0FFDo0op0N7Cmp0zNpljdb_lYZ6wHu0SXew87pzOgATreVnHdq71gVfpg3M-iMT0wvmWwHVwri3-mYKSSp51XiIkOrkApPIjEvZX9IGRyhWcETuTSv0kTuVCtP241EO92TWQneEh3Yg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("디카이퍼 카카오 다크", "생크림"))))
                .recipe(new Recipe(List.of("잔에 디카이퍼 카카오 다크 22.5ml를 넣어줍니다."
                        , "그 위에 생크림을 7.5ml 올려줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET)))
                .rate(new Rate())
                .build();
        angelTip.assignUser(user);
        cocktailRepository.save(angelTip);

        Cocktail cacaoFizz = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("카카오 피즈")
                .imageUrl("https://mblogthumb-phinf.pstatic.net/MjAxODA2MDNfMTYy/MDAxNTI4MDM0NDY1MzAy.Hn8dMvbg5PaGhQIzzKwAN0xBLPBJnPFnqrTXrN4OwQog.MOnMwI-x39d-eLUo3f3nLRqAAmCltatTH7QSFHJw2wgg.JPEG.infinitia00/20180603_2255221.jpg?type=w420")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임 주스", "설탕", "탄산수"))))
                .recipe(new Recipe(List.of("잔에 디카이퍼 카카오 다크 30 ~ 45ml를 넣어줍니다."
                        , "라임 주스 15ml를 넣어줍니다."
                        , "설탕 1 ~ 2티스푼을 넣어줍니다."
                        , "탄산수를 가득 채워줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET)))
                .rate(new Rate())
                .build();
        cacaoFizz.assignUser(user);
        cocktailRepository.save(cacaoFizz);

        Cocktail fernandito = Cocktail.builder()
                .category(Category.CATEGORY1)
                .liquor(Liquor.LIQUEUR)
                .name("페르난디토")
                .imageUrl("https://i.namu.wiki/i/uQmNpLrTxTCcBGDSi5me1vG-9cCC6ho8nkvdIpXSIvCgT2frLZ6k0Ykm2TM8AjcSvyKTkCcjMkt2cNKesePxZ4O3SU0mrkAblM86aqCgZM-d1W5-TDWgIKGd4O3gO8xznvPi4DGUdCPQyX23wRFITg.webp")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("콜라", "얼음"))))
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다."
                        , "브랑카 멘타 50ml를 넣어줍니다."
                        , "콜라를 가득 채워줍니다.")
                        , 0))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET, Tag.BITTER)))
                .rate(new Rate())
                .build();
        fernandito.assignUser(user);
        cocktailRepository.save(fernandito);
    }
}
