import logging
from typing import Dict, Any, Tuple

logger = logging.getLogger("nexus.analytics.quotas")


class QuotaManager:
    """
    Tenant Token Budget Limits & Spending Quota Management.
    """
    TIER_MONTHLY_TOKEN_QUOTAS = {
        "user": 500000,       # 500k tokens/mo
        "pro": 5000000,       # 5M tokens/mo
        "admin": 100000000    # 100M tokens/mo
    }

    @classmethod
    def check_quota(cls, role: str, current_monthly_tokens: int) -> Tuple[bool, int]:
        """
        Verify if user has remaining token allowance.
        """
        quota_limit = cls.TIER_MONTHLY_TOKEN_QUOTAS.get(role, 500000)
        remaining = max(0, quota_limit - current_monthly_tokens)
        is_allowed = current_monthly_tokens < quota_limit
        return is_allowed, remaining


quota_manager = QuotaManager()
