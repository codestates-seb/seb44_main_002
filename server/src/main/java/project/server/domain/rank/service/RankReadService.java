package project.server.domain.rank.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.rank.repository.RankRepository;
import project.server.domain.rank.vo.Rank;
import project.server.domain.user.entity.User;

import java.util.List;

@Service
public class RankReadService {

    public static final int DEFAULT_ELEMENTS_COUNT = 5;
    public static final int DEFAULT_PAGE_NUMBER = 0;

    private final RankRepository rankRepository;

    public RankReadService(RankRepository rankRepository) {
        this.rankRepository = rankRepository;
    }

    @Transactional(readOnly = true)
    public List<Rank> readTotalRank() {
        Pageable pageable = PageRequest.ofSize(DEFAULT_ELEMENTS_COUNT).withPage(DEFAULT_PAGE_NUMBER);
        return rankRepository.findBestCocktails(pageable);
    }

    @Transactional(readOnly = true)
    public List<Rank> readSignedUserRank(User user) {
        Pageable pageable = PageRequest.ofSize(DEFAULT_ELEMENTS_COUNT).withPage(DEFAULT_PAGE_NUMBER);
        return rankRepository.findRecommendCocktails(getUserAgeGroup(user),
                user.getGender(),
                pageable);
    }

    private int getUserAgeGroup(User user) {
        return user.getAge() / 10 * 10;
    }
}
