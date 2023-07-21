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
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임즙", "드카이퍼 프리플섹", "심플시럽", "소금", "라임", "얼음"))))
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
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SOUR, Tag.SWEET)))
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

        Cocktail Salty_Dog = Cocktail.builder()
                .name("솔티 독")
                .recipe(new Recipe(List.of("잔 주둥이에 소금을 바릅니다."
                        , "얼음을 넣어줍니다.", "진을 40ml 넣어줍니다.", "자몽주스를 100ml 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("자몽주스", "소금", "얼음"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/ogbSRDdBiP5Ykx3zmjy7QE4nesdOXp4bvqYMsTh4j1JEONxK-gTm61xc1dPW_tiDRwRqvH4WAgmkFzAE4nujm_rO7bzHYumG0dWm7NAeEQS-LCuVL9verYuwb3W5nDwbOUI2mfvh3SzCQKd48skQ1w.webp")
                .rate(new Rate())
                .build();
        Salty_Dog.assignUser(user);
        cocktailRepository.save(Salty_Dog);

        Cocktail Greyhound = Cocktail.builder().
                name("그레이하운드")
                .recipe(new Recipe(List.of("잔에 소금을 넣어줍니다."
                        , "얼음을 넣어줍니다.", "진을 40ml 넣어줍니다.", "자몽주스를 100ml 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .imageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%B3.jpeg")
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("자몽주스", "소금", "얼음"))))
                .rate(new Rate())
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_LOW)))
                .build();
        Greyhound.assignUser(user);
        cocktailRepository.save(Greyhound);

        Cocktail Bees_Knees = Cocktail.builder()
                .name("비스 니즈")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.", "꿀을 20ml 넣어줍니다.", "레몬즙을 20ml 넣어줍니다.", "진을 50ml 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("꿀", "레몬즙"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/tTZJo86mmLxc-nxMP2lIPwP2FdrYsg_1B0I6TELFXBzSHvQKQhSFgCNgdolg0-i9r3D4TL2ZfgPt09pK35lwXNQKJjalDdNGwSN-3uvXAaw2I4Gs2c5exAN-XNjItjCH2g9kRL3eylALi7HuQjJ86g.webp")
                .rate(new Rate())
                .build();
        Bees_Knees.assignUser(user);
        cocktailRepository.save(Bees_Knees);

        Cocktail White_Lady = Cocktail.builder()
                .name("화이트 레이디")
                .recipe(new Recipe(List.of("잔에 레몬즙 20ml를 넣어줍니다."
                        , "드카이퍼 트리플섹 20ml를 넣어줍니다.", "설탕물(1:1 비율) 5ml를 넣어줍니다.", "계란 흰자를 넣어줍니다.", "거품이 날정도로 휘저어줍니다.", "얼음을 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레몬즙", "드카이퍼 트리플섹", "설탕물", "계란흰자"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/Uftdve-CTJ02Vl4rx9dKxXpM8ZcFfB6JYyeqt7fVCoQg5ITfMzVvX63tPvEUeHbKrWOd9RSozFIqXNa4smqkl6pmEDcMxxTOF7t-8HL0XQ-bXngbLPkYW0CabG5jaJKSemb0LD_5iwTXiQv9n1EMdA.webp")
                .rate(new Rate())
                .build();
        White_Lady.assignUser(user);
        cocktailRepository.save(White_Lady);

        Cocktail A1 = Cocktail.builder()
                .name("A1")
                .recipe(new Recipe(List.of("잔에 진 30ml를 넣어줍니다.", "트리플 섹 30ml를 넣어줍니다.", "레몬즙 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("트리플 섹", "레몬즙"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/AJjDY2dcAFC977sBw3hdCkz0VhlJ65GHEq64yQ11Xkrs1x2lCldVOYrpUqVumKY6wN2kOTS8ej_2gQM9oC6w15QdRIqTeddh56n5Ka_PPYPTVwnX8DUYtfenpZqIhUGzcevWNzZD3cCzok1EdVhwRw.webp")
                .rate(new Rate())
                .build();
        A1.assignUser(user);
        cocktailRepository.save(A1);

        Cocktail Gimlet = Cocktail.builder()
                .name("김렛")
                .recipe(new Recipe(List.of("잔에 드라이 진 45ml를 넣어줍니다.", "라임 주스 15ml를 넣어줍니다.", "설탕 1 티스푼을 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임주스", "설탕"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.SOUR, Tag.FREQUENCY_HIGH)))
                .imageUrl("https://i.namu.wiki/i/v-J9eRNYPK8nHtlepOjXFNEFxXy9JYELD1adPHp3t8bXQD5KUHGj3fxshGvkRu2LVqJi7V2u5yE9xzdM94ZS9lr3Rambb3n2MKkPaY_YvKkWZZhSDo7pe8GVvOAVb1ACAAWaHH9e6pmckZnAive1wQ.webp")
                .rate(new Rate())
                .build();
        Gimlet.assignUser(user);
        cocktailRepository.save(Gimlet);

        Cocktail Bronx = Cocktail.builder()
                .name("브롱스")
                .recipe(new Recipe(List.of("잔에 진 30ml를 넣어줍니다.", "마티니 엑스트라 드라이 10ml를 넣어줍니다.", "마티니 로쏘 15ml를 넣어줍니다.", "오렌지 주스 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("마티니 엑스트라 드라이", "마티니 로쏘", "오렌지 주스"))))
                .tags(new Tags(List.of(Tag.SOUR, Tag.BITTER, Tag.FREQUENCY_HIGH)))
                .imageUrl("https://i.namu.wiki/i/hlol4F2am_ZYl7OrGAwXf_gNaEY4YaWOnWhnmyJ-U41OqQsm8RXZuYsPT85fvEZvRDHFKA3HcZIVnLAJRG7S_xkQN7A-UU7E67607JonOzzRHAA6a3tAlIuW57p9KTdine3QGGkevG6ehlRVa2wO3A.webp")
                .rate(new Rate())
                .build();
        Bronx.assignUser(user);
        cocktailRepository.save(Bronx);

        Cocktail Blue_coral_reef = Cocktail.builder()
                .name("블루 코랄 리프")
                .recipe(new Recipe(List.of("잔에 진 45ml를 넣어줍니다.", "디카이퍼 민트 그린 15ml를 넣어줍니다.", "설탕물(1:1 비율)을 10ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("디카이퍼 민트 그린", "설탕물"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/0SPxsBe2sSBCYKtNrshUmMzVVZFwoxQxKE6U6SvegaygySDKZ__3ZVp1JeSJzUu4Gr5URUURlrhfjOTdNcxNKSj4KA_4wCuifAkmX2ywwM1fL7V6okSZWhpEQPxEWRhnXhio0LqfgSTxF4qwaH7-Dw.webp")
                .rate(new Rate())
                .build();
        Blue_coral_reef.assignUser(user);
        cocktailRepository.save(Blue_coral_reef);

        Cocktail John_Collins = Cocktail.builder()
                .name("존 콜린스")
                .recipe(new Recipe(List.of("잔에 진 45ml를 넣어줍니다.", "레몬주스 30ml를 넣어줍니다.", "설탕물(1:1비율)을 15ml를 넣어줍니다.", "탄산수 60ml 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레몬주스", "설탕물", "탄산수"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/5FBROfQbd4i5nMBpF-TzfVoF9NIYHrXcOwCrFkbAiM2TUtb92gnNhp_GC5i60t70UN68ftOeJ19TwUBtsuoCHqJc4Kug7AaRjpxNVHoD9fS3k2o-18k3SUhQ5bm6JozJ2x0voqzKqh9Jtoz47EquBw.webp")
                .rate(new Rate())
                .build();
        John_Collins.assignUser(user);
        cocktailRepository.save(John_Collins);

        Cocktail Gin_lime = Cocktail.builder()
                .name("진 라임")
                .recipe(new Recipe(List.of("잔에 진 45ml를 넣어줍니다.", "라임 주스 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임 주스"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/KTfY17-ZjtuqvSq8b_wmTZIeDtrmIZHSTK1tqI0cbwVLHiq_3Ri3S22fSFaKOBx7ajDp3SAdrBY3N22VRqcJfLRYiicKFwccN06DGZnY1OsI69H1VLfxG35kR3ucU91IY_pr2ck1ht5k7RdrYmiQHA.webp")
                .rate(new Rate())
                .build();
        Gin_lime.assignUser(user);
        cocktailRepository.save(Gin_lime);

        Cocktail Gin_tonic = Cocktail.builder()
                .name("진 토닉")
                .recipe(new Recipe(List.of("잔에 진 45ml를 넣어줍니다.", "토닉워터를 끝까지 채워줍니다.", "레몬즙(라임즙)을 1 티스푼 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("토닉 워터", "레몬즙 또는 라임즙"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/0ENiZmUDSu2RmsphzqLDc0I-XgRAzjDifuQoDqiz5rJRifDYfeQ0HlrasA364qgHSU5ExR_xw0SJ-ZIGnRQQd23ai1_JDHUPluBL-tHIFvXCKCbkihhqk4cIC4nEt3lo6zadGfo58q0ID8BZVT7r1A.webp")
                .rate(new Rate())
                .build();
        Gin_tonic.assignUser(user);
        cocktailRepository.save(Gin_tonic);

        Cocktail Parisien = Cocktail.builder()
                .name("파리지앵")
                .recipe(new Recipe(List.of("잔에 진 30ml를 넣어줍니다.", "마티니 엑스트라 드라이 30ml를 넣어줍니다.", "베드렌 크림드카시스 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.JIN)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("마티니 엑스트라 드라이", "베드렌 크림드카시스"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/y1GMcnyEcGZ3-I-5Y-5DllKJSUyi558bz_AZtDKwY_rgvjxb45oKiLW8A5XreLvjI3JsXcXmEgRgqKf0dftsqiGC_4tieU9upD-2bPrCaeMHdn8sQqZuLbqNAEnudqgM78nlDW-R4QETqrqbVX8VEA.webp")
                .rate(new Rate())
                .build();
        Parisien.assignUser(user);
        cocktailRepository.save(Parisien);

        Cocktail Daiquiri = Cocktail.builder()
                .name("다이키리")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.", "심플시럽 20ml을 넣어줍니다.", "라임즙 20ml을 넣어줍니다.", "럼 50ml 를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("심플시럽", "라임즙", "얼음"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/cu7pKCeO5FIZJ3faajnrF9wWyhDeW0SN1OyHKkFlcgsxfAN3b8X13ZjdDKNse4I-EzFOQzZFSKvjU41PIdzaLPpGdhSPw49U5hr0rVZU50-xcne9LmWPHe-I-sQb1SKbQTMlKcxBVbJQ3Tc5J04vuA.webp")
                .rate(new Rate())
                .build();
        Daiquiri.assignUser(user);
        cocktailRepository.save(Daiquiri);

        Cocktail El_Presidente = Cocktail.builder()
                .name("엘 프레지덴테")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.", "그레나딘시럽 5ml를 넣어줍니다.", "마티니 엑스트라 드라이 20ml를 넣어줍니다.", "드카이퍼 트리플섹 10ml를 넣어줍니다.", "럼 50ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "그레나딘시럽", "마티니 엑스트라 드라이", "드카이퍼 트리플섹"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://cocktail-project.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A6%E1%86%AF+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8C%E1%85%B5%E1%84%83%E1%85%A6%E1%86%AB%E1%84%90%E1%85%A6.jpeg")
                .rate(new Rate())
                .build();
        El_Presidente.assignUser(user);
        cocktailRepository.save(El_Presidente);

        Cocktail Dark_And_Stormy = Cocktail.builder()
                .name("다크 앤 스토미")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.", "다크럼 50ml를 넣어줍니다.", "라임즙 10ml를 넣어줍니다.", "설탕시럽을 1ml 정도 넣어줍니다.", "진저에일로 잔의 남은 공간을 가득 채워줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "라임즙", "설탕시럽", "진저에일"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/X2Ga3pKlOyyHql2KmYjEmDHOO9ZHasLdi3lk3vnjF8Qwrt03-MG9_DZczJyVS2LxXaEvM78TeWGUa60KuJziKcRSc1iMwWAjkJaR8CMDrNUG1I9KfKf8OMmV4jqO_bb6KAwq2KfNSq2HiKmfX6b7iw.webp")
                .rate(new Rate())
                .build();
        Dark_And_Stormy.assignUser(user);
        cocktailRepository.save(Dark_And_Stormy);

        Cocktail No_Name = Cocktail.builder()
                .name("노 네임")
                .recipe(new Recipe(List.of("잔에 골드럼과 다크럼을 각각 48ml 넣어줍니다.", "벌꿀 12ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("벌꿀"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_HIGH)))
                .imageUrl("https://evape.kr/data/file2016/recipe/thumb-238594180_oJ90zgXj_Bar-C-No-Name-Yet-Cocktail_278x156.jpg")
                .rate(new Rate())
                .build();
        No_Name.assignUser(user);
        cocktailRepository.save(No_Name);

        Cocktail Grog = Cocktail.builder()
                .name("그로그")
                .recipe(new Recipe(List.of("잔에 골드 또는 다크 럼을 45ml 넣어줍니다.", "설탕을 1~2 티스푼 넣어줍니다.", "나머지를 물로 채워줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("설탕", "물"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/GLr2EhvlNCS70RTc5xszG0aj5ZLIAQSkYBknwf4E4Bzn6XoiGoKRwWGOpmf1hyqdylFX0x_xus42tNSNoSS5MRNfIRIWsORkJNJmo2b79fJaHeL64GjqtksqFjH7i55xXld4v3UXhmJloyupjfOGDQ.webp")
                .rate(new Rate())
                .build();
        Grog.assignUser(user);
        cocktailRepository.save(Grog);

        Cocktail Blue_Hawaiian = Cocktail.builder()
                .name("블루 하와이안")
                .recipe(new Recipe(List.of("잔에 럼 30ml를 넣어줍니다.", "디카이퍼 블루 큐라소 30ml를 넣어줍니다.", "말리부 30ml를 넣어줍니다.", "파인애플 주스(파워에이드 마운틴블라스트, 폴라포 스포츠) 75ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("디카이퍼 블루 큐라소", "말리부", "파인애플 주스"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/ULwNSnjbq_8_BAurq6oJUjo_CLZQJPITpvPged5CWT2TbHNtEoUqT5YrAaIZUfA14nZ_rIB5x4tRPkz---KX-qoJxF-_RnzEnMHcxxdp2Ajm8nbJ3l3HyF2_kVcvpN3OfwwlAMvjRKqvQhTWbNy0tw.webp")
                .rate(new Rate())
                .build();
        Blue_Hawaiian.assignUser(user);
        cocktailRepository.save(Blue_Hawaiian);

        Cocktail Cuba_Libre = Cocktail.builder()
                .name("쿠바 리브레")
                .recipe(new Recipe(List.of("잔에 럼 45ml를 넣어줍니다.", "라임주스 15ml를 넣어줍니다.", "콜라로 채워줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임주스", "콜라"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/8eFARAt4h9BoEsg4aA8hmw8GPTpql2MgfA75Aj7ChrhH6axyHXtuBCG6ARYqqgBwfCx8nXaJZclpC47PBu1J1s8i8tNwQfvizxO21gW_ybYdhVQJkhPNuJB2rh3l86plZA9p-mXKO1LJKcZdDvsKZA.webp")
                .rate(new Rate())
                .build();
        Cuba_Libre.assignUser(user);
        cocktailRepository.save(Cuba_Libre);

        Cocktail Faust = Cocktail.builder()
                .name("파우스트")
                .recipe(new Recipe(List.of("잔에 오버프루프 럼 30ml를 넣어줍니다.", "베드렌 크림 드카시스 15ml를 넣어줍니다.", "화이트럼 30ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY2)
                .liquor(Liquor.RUM)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("베드렌 크림 드카시스"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_HIGH)))
                .imageUrl("https://i.namu.wiki/i/Lphs5L_Do8BDC063t3fy6hdfK6ajm7nFo0d7vmiAB3PO2Jxt4Iar42InnJHNSvpCZWy2xZk3V6Okc_wz-h9ul6leS__xlVG8yJJqC-q3Gg9_FgEtH78CkI56kJBOHx2MxtuyZz7QJu9Wq2y1wEYciQ.webp")
                .rate(new Rate())
                .build();
        Faust.assignUser(user);
        cocktailRepository.save(Faust);
        Cocktail moscowMule = Cocktail.builder()
                .name("모스코뮬")
                .recipe(new Recipe(List.of("잔에 보드카 50ml를 넣어줍니다.",
                        "라임즙 15ml를 넣어줍니다.",
                        "설탕물(1:1 비율)을 10ml 넣어줍니다.",
                        "진저 에일을 잔 가득 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음","라임즙", "설탕물", "진저에일"))))
                .tags(new Tags(List.of(Tag.SOUR, Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/jhfi7A3Od6wccMUwHH0liNQqTNgkNHAz4Kg8lHHsZ0GDQnGymlNhTaI6NZQHIH05yTlQgUicvkxLH0y_1yeWf6pToQRsCFXWtYiFdwofiFTjniZV8w22vcjYs8vpBJpT8N7uJZW51l3S6lIrXb-lsw.webp")
                .rate(new Rate())
                .build();
        moscowMule.assignUser(user);
        cocktailRepository.save(moscowMule);

        Cocktail cosmopolitan = Cocktail.builder()
                .name("코스모폴리탄")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "보드카 30ml를 넣어줍니다.",
                        "라임즙 10ml를 넣어줍니다.",
                        "크렌베리 주스 20ml를 넣어줍니다.",
                        "드카이퍼 트리플섹 20ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("라임즙", "크렌베리주스", "드카이퍼 트리플섹", "얼음"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/BxfDApgcwmlMuDdEnNORi_hyVspWIVyWRvOu_rj48hfWTztiVvVkYXaIcVK00CRmbuGEruLWZlSTBX_XMsycxNNA7bzmU42qRsVOw35any4k6xi7piAiyJTl3SedwiQUYTWCC-X-VWUgZBdLCx4AhA.webp")
                .rate(new Rate())
                .build();
        cosmopolitan.assignUser(user);
        cocktailRepository.save(cosmopolitan);

        Cocktail seaBreeze = Cocktail.builder()
                .name("시브리즈")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "보드카 45ml를 넣어줍니다.",
                        "크랜베리 120ml를 넣어줍니다.",
                        "자몽주스 30ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "크랜베리 주스", "자몽 주스"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/reZGjc9aQ2CWgQjmLDNZbV0P_XEsf9vUiiID7E-fg7mgqY8rvi9nbGupdlueunStI_va3D_14tWxogq7AF1MAk_wTIhaj1p6jU62eInksmr6cYcN5jvwttKg8pbDA2kkefjNblCcnU0hf58yYnu0bA.webp")
                .rate(new Rate())
                .build();
        seaBreeze.assignUser(user);
        cocktailRepository.save(seaBreeze);

        Cocktail russianSpringPunch = Cocktail.builder()
                .name("러시안 스프링 펀치")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "보드카 25ml를 넣어줍니다.",
                        "라임 주스 25ml를 넣어줍니다.",
                        "베드랜 크림드카시스 15ml를 넣어줍니다.",
                        "설탕물(1:1 비율)을 넣어줍니다.",
                        "얼음을 빼줍니다.(선택사항)",
                        "스파클링 와인으로 잔을 가득 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("베드랜 크림드카시스", "라임주스", "얼음", "설탕물", "스파클링 와인"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/FS_dLNMiUS9N4azIV4sYl_mGohW_nLZLWkbUBnfgvAcBVqCUkrepJCXNaOiVZloizQtcIHFjmmNK36TBE2t_Tda6hxyUPnLsbrDy1sCghNLxx0nKyDFGcrFDMGxPWC0r2cE_vTbqMRv8TEGk_kpNAw.webp")
                .rate(new Rate())
                .build();
        russianSpringPunch.assignUser(user);
        cocktailRepository.save(russianSpringPunch);

        Cocktail balalaika = Cocktail.builder()
                .name("발랄라이카")
                .recipe(new Recipe(List.of("잔에 보드카 30ml를 넣어줍니다.",
                        "레몬 주스 30ml를 넣어줍니다.",
                        "디카이퍼 트리플섹 30ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("레몬주스", "디카이퍼 트리플섹"))))
                .tags(new Tags(List.of(Tag.SOUR, Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://i.namu.wiki/i/RP42EgthhTTDertR70B3x86XTo1uPD3Qr3U26kVS04endI57iTl3DL5GsgcMBy65ma48RcgtKRMlEXQ70F4pxhErMhKgt49EIg7ZNmnPG1-phm1f6u7WelRQIzg2eX8AlSfFH7J_gu-O82JRUfS6mQ.webp")
                .rate(new Rate())
                .build();
        balalaika.assignUser(user);
        cocktailRepository.save(balalaika);

        Cocktail vodkaTini = Cocktail.builder()
                .name("보드카티니")
                .recipe(new Recipe(List.of("보드카 45ml를 넣어줍니다.",
                        "마티니 엑스트라 드라이를 넣어줍니다.",
                        "007 시리즈를 흉내내고싶다면 젓지 말고 흔들어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("마티니 엑스트라 드라이"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://meloncoffee.com/wp-content/uploads/2022/01/martini-geb9d92c76_1280.jpg")
                .rate(new Rate())
                .build();
        vodkaTini.assignUser(user);
        cocktailRepository.save(vodkaTini);

        Cocktail blackMartini = Cocktail.builder()
                .name("블랙 마티니")
                .recipe(new Recipe(List.of("잔에 보드카 30ml를 넣어줍니다.",
                        "깔루아 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("깔루아"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.BITTER, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/HoNshx8Nx3u7HdvOgBE0n9k_2g40oPuYMd4V4vYRpa1tZgIbw_C7DSESzX2KgriIH4D2vg4eDHItjOt2rALQQ2f7zx7wxBvSZPxnLeN8MLy2B59FbjQKGIM8jC3ldHuZvoI5NBGtpnHA3vcbTmhhoQ.webp")
                .rate(new Rate())
                .build();
        blackMartini.assignUser(user);
        cocktailRepository.save(blackMartini);

        Cocktail blueLagoonShort = Cocktail.builder()
                .name("블루 라군 숏")
                .recipe(new Recipe(List.of("잔에 보드가 30ml를 넣어줍니다.",
                        "디카이퍼 블루 큐라소 15ml를 넣어줍니다.",
                        "레몬주스 15ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("디카이퍼 블루 큐라소", "레몬주스"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.SOUR, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/qJ_rXXvC9MQ-4otim3WFHO9gmMUB2x2bwrg0thOpmbpU-TzhL2gwk4rscqM1pZQSUSMvVRW8PjaRnyolnu0HbRd2vYzInqLWw01qnNXxHEWigdbu3itw1Bv4OAad-eyoj2KU3FOTMDktZRSLEmRrQA.webp")
                .rate(new Rate())
                .build();
        blueLagoonShort.assignUser(user);
        cocktailRepository.save(blueLagoonShort);

        Cocktail blueLagoonLong = Cocktail.builder()
                .name("블루 라군 롱")
                .recipe(new Recipe(List.of("잔에 보드가 40ml를 넣어줍니다.",
                        "디카이퍼 블루 큐라소 15ml를 넣어줍니다.",
                        "레몬주스 20ml를 넣어줍니다.",
                        "사이다를 잔 끝까지 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("디카이퍼 블루 큐라소", "레몬주스", "사이다"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/jIxmQNmtxvJCCg2_wvUWWla-0lDgU9pGCJosBcPXLkcwhOAQwgBT3qOR-9ZuhNVYn5YlRzPMgP_qn1tZgvq2CFRU5ATWIZgJGzN22iYg6khAF-hQDGlrNZIdT9YQGXttjtcVPJhzwF9nJgZnf9KuPg.webp")
                .rate(new Rate())
                .build();
        blueLagoonLong.assignUser(user);
        cocktailRepository.save(blueLagoonLong);

        Cocktail screwDriver = Cocktail.builder()
                .name("스크루 드라이버")
                .recipe(new Recipe(List.of("잔에 보드카 30ml를 넣어줍니다.",
                        "오렌지 주스를 잔 끝까지 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.VODKA)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("오렌지 주스"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.FREQUENCY_LOW)))
                .imageUrl("https://i.namu.wiki/i/W0VxMg65AqzL5u6XleCn364P41isWLdll_R6vPjI_PoV7kkdkiMlnu7kKjVrMyqBMnJIy7BJ9-eswPYV75FJrCw-75ZqUEHVa4dqKvsc4uhC7ao1jSuyT8FDaTzp7lhj2cymcgbALy1-MevpowNnyQ.webp")
                .rate(new Rate())
                .build();
        screwDriver.assignUser(user);
        cocktailRepository.save(screwDriver);

        Cocktail godFather = Cocktail.builder()
                .name("갓파더")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "스카치 위스키 60ml를 넣어줍니다.",
                        "디사론노 30ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "디사론노"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_HIGH)))
                .imageUrl("https://i.namu.wiki/i/Rn5mbNGfnG4FfXs3JWSLUwCgnMG2lr4q7aYFHp1g9gJHVkBuNsWvuq3vuK-e8pE_WLJ9sBJPgNTDXgz4FlORS1lktxV1f0Dv471vZhxFdvGck2xXPqCnpl7PgHYaLVgDx7DO5Rp5PUQ9oLxNR7pE8g.webp")
                .rate(new Rate())
                .build();
        godFather.assignUser(user);
        cocktailRepository.save(godFather);

        Cocktail autumnDelight = Cocktail.builder()
                .name("어텀 딜라이트")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "위스키 60ml를 넣어줍니다.",
                        "써머스비를 잔 가득 채워줍니다"), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "써머스비 맥주"))))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.SWEET, Tag.BITTER)))
                .imageUrl("https://www.thespruceeats.com/thmb/5U4MSkuutcWGhUhFEk8Ldvg1AmI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143693764-crop-58a4b3763df78c4758d3ec92.jpg")
                .rate(new Rate())
                .build();
        autumnDelight.assignUser(user);
        cocktailRepository.save(autumnDelight);

        Cocktail bloodAndSand = Cocktail.builder()
                .name("블러드 앤 샌드")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "오렌지 주스 20ml를 넣어줍니다.",
                        "마티니 로쏘 20ml를 넣어줍니다.",
                        "드카이퍼 체리 히어링 20ml를 넣어줍니다.",
                        "스카치 위스키 20ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "오렌지 주스", "마티니 로쏘", "드카이퍼 체리 히어링"))))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.BITTER)))
                .imageUrl("https://www.liquor.com/thmb/RFXLLHRx6TpAwaJRuon7HHb4GYU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/blood-and-sand-720x720-primary-a27c8e8da61b410facde9292b600d908.jpg")
                .rate(new Rate())
                .build();
        bloodAndSand.assignUser(user);
        cocktailRepository.save(bloodAndSand);

        Cocktail jackCoke = Cocktail.builder()
                .name("잭콕")
                .recipe(new Recipe(List.of("잔에 잭 다니엘 45ml를 넣어줍니다.",
                        "콜라를 잔 가득 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("콜라"))))
                .tags(new Tags(List.of(Tag.FREQUENCY_LOW, Tag.SWEET, Tag.BITTER)))
                .imageUrl("https://www.acouplecooks.com/wp-content/uploads/2020/12/Jack-and-Coke-003.jpg")
                .rate(new Rate())
                .build();
        jackCoke.assignUser(user);
        cocktailRepository.save(jackCoke);

        Cocktail irishCoffee = Cocktail.builder()
                .name("아이리시 커피")
                .recipe(new Recipe(List.of("잔에 뜨거운 커피 120ml를 넣어줍니다.",
                        "제임슨 50ml를 넣어줍니다.",
                        "설탕 1 티스푼을 넣어줍니다.",
                        "크림 50ml를 위에 살짝 얹어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("뜨거운 커피", "설탕", "크림"))))
                .tags(new Tags(List.of(Tag.SWEET, Tag.BITTER, Tag.FREQUENCY_LOW)))
                .imageUrl("https://creative-culinary.com/wp-content/uploads/irish-coffee-2.jpg")
                .rate(new Rate())
                .build();
        irishCoffee.assignUser(user);
        cocktailRepository.save(irishCoffee);

        Cocktail whiskeyFloat = Cocktail.builder()
                .name("위스키 플로트")
                .recipe(new Recipe(List.of("잔의 70%를 얼음을 넣은 차가운물로 가득 채워줍니다.",
                        "위스키를 남은 잔에 서로 섞이지않게 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("물"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://mblogthumb-phinf.pstatic.net/20121015_69/xhobar_13502894193709m4FS_JPEG/b0040511_48c7a5ef5c878.jpg?type=w420")
                .rate(new Rate())
                .build();
        whiskeyFloat.assignUser(user);
        cocktailRepository.save(whiskeyFloat);

        Cocktail presbyterian = Cocktail.builder()
                .name("프레스비터리언")
                .recipe(new Recipe(List.of("잔에 위스키 45ml를 넣어줍니다.",
                        "진저에일 45ml를 넣어줍니다.",
                        "탄산수를 잔 가득 채워줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("진저에일", "탄산수"))))
                .tags(new Tags(List.of(Tag.FREQUENCY_MEDIUM, Tag.BITTER)))
                .imageUrl("https://i.namu.wiki/i/HSAea2jji50f8izoJBTp6_134oPw8Bz80rbF5dl5LmudDKKSrVC0GT6RbYmIORMLNGipznO1y9lJ04bMb9s-6IsaNPBokkpTGb5B1kEaDyZDcuib-PwWmHidnNjH69w5mZ80Jv6RiBTnH_03GpW60w.webp")
                .rate(new Rate())
                .build();
        presbyterian.assignUser(user);
        cocktailRepository.save(presbyterian);

        Cocktail highBall = Cocktail.builder()
                .name("하이볼")
                .recipe(new Recipe(List.of("잔에 얼음을 넣어줍니다.",
                        "위스키 30~ 45ml를 넣어줍니다.",
                        "탄산수 60~ 90ml를 넣어줍니다."), 0))
                .category(Category.CATEGORY3)
                .liquor(Liquor.WHISKEY)
                .ingredients(new Ingredients(new LinkedHashSet<>(Set.of("얼음", "탄산수"))))
                .tags(new Tags(List.of(Tag.BITTER, Tag.FREQUENCY_MEDIUM)))
                .imageUrl("https://www.thespruceeats.com/thmb/kTGwTG-dGJ1SNghgGpBtAomBaxQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-highball-cocktail-recipe-761448-hero-02-f33520a9f6394878a6975da514613142.jpg")
                .rate(new Rate())
                .build();
        highBall.assignUser(user);
        cocktailRepository.save(highBall);
    }
}
